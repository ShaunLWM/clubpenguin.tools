import "dotenv/config";

import download from "download";
import { drizzle } from "drizzle-orm/node-postgres";
import fs from "node:fs";
import pascalcase from "pascalcase";
import sharp from "sharp";
import { CardsTable } from "../db/schema/Cards";
import { CollectionsTable } from "../db/schema/Collection";
import { databaseUrl } from "../lib/Helper";

const INSERT_DB = false;
const USE_JSON = false;
const DOWNLOAD_IMG = false;

type JsonFile = Array<{
	name: string;
	key: string;
	cards: Array<{
		name: string;
		index: number;
		img: string;
	}>;
}>;

const db = drizzle(databaseUrl);

type TFile = {
	name: string;
	file: string;
	key: string;
};

const files: Array<TFile> = [
	{
		name: "Set 1",
		file: "1-original.txt",
		key: "set-1",
	},
	{
		name: "Card-Jitsu Puffle Deck",
		file: "2-puffle.txt",
		key: "cj-puffle",
	},
	{
		name: "Card-Jitsu",
		file: "3-card-jitsu.txt",
		key: "cj",
	},
	{
		name: "Card-Jitsu: Fire",
		file: "4-card-jitsu-fire.txt",
		key: "cj-fire",
	},
	{
		name: "Card-Jitsu: Fire Expansion Deck",
		file: "5-fire-expansion.txt",
		key: "cj-fire-expansion",
	},
	{
		name: "Card-Jitsu: Water",
		file: "6-card-jitsu-water.txt",
		key: "cj-water",
	},
	{
		name: "Card-Jitsu: Water Second Wave",
		file: "7-card-jitsu-water-second-wave.txt",
		key: "cj-water-second-wave",
	},
];

function pascalName(name: string) {
	return name.split(" ").map(pascalcase).join(" ");
}

function extractTableGroups(input: string) {
	if (!input) {
		console.error("No input", input);
		return null;
	}

	const matches =
		/^<tr><td>(.*?)<\/td>.*?<a href="(.*?)\/revision.*?<\/div><\/td><td>(.*?)<\/td>/g.exec(
			input,
		);
	if (!matches) {
		console.error("No matches", input);
		return null;
	}

	const [, cardName, imageUrl, cardNumber] = matches;

	console.log(cardName);
	if (cardName.startsWith("<a")) {
		const matches = /^<a href="\/wiki\/.*?" title="(.*?)">(.*?)<\/a>$/g.exec(
			cardName,
		);
		if (!matches) {
			return null;
		}
		const [, subName, mainName] = matches;
		return [
			`${pascalName(mainName)} - ${pascalName(subName)}`,
			imageUrl,
			cardNumber,
		];
	}

	return [`${pascalName(cardName)}`, imageUrl, cardNumber];
}

(async () => {
	if (USE_JSON) {
		return;
	}

	const json: JsonFile = [];
	for (const f of files) {
		const collection: JsonFile[number] = {
			name: f.name,
			key: f.key,
			cards: [],
		};

		let currentCardNumber = 0;
		const file = fs.readFileSync(`${__dirname}/${f.file}`, "utf8");
		const arr = file.split("</tr>");

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let result: any;
		if (INSERT_DB) {
			result = await db
				.insert(CollectionsTable)
				.values({
					name: f.name,
					img: f.file,
					key: f.key,
				})
				.returning()
				.onConflictDoNothing();
			console.log(result);
		}

		for (const line of arr) {
			const p = line
				.replace(/[\n\r]+/g, "")
				.replace(/\t/g, "")
				.replace(/\s+/g, " ")
				.trim();

			if (!p) {
				continue;
			}

			const r = extractTableGroups(p);
			if (!r) {
				process.exit(1);
			}

			console.log(r);
			let index = Number(r?.[2].split("/")[0]);
			if (Number.isNaN(index)) {
				currentCardNumber += 1;
				index = currentCardNumber;
			}

			collection.cards.push({
				name: r[0],
				index,
				img: r[1],
			});

			const imgPath = `${__dirname}/deck/${f.key}/${currentCardNumber}`;
			if (!fs.existsSync(`${imgPath}.png`) && DOWNLOAD_IMG) {
				await download(r[1], `${__dirname}/deck/${f.key}`, {
					filename: `${currentCardNumber}.png`,
				});

				await sharp(`${imgPath}.png`)
					.resize({ fit: "contain", width: 200 })
					.webp({ lossless: true })
					.toFile(`${imgPath}_s.webp`);
				await sharp(`${imgPath}.png`)
					.resize({ fit: "contain", width: 400 })
					.webp({ lossless: true })
					.toFile(`${imgPath}_l.webp`);
			}

			if (INSERT_DB) {
				await db
					.insert(CardsTable)
					.values({
						collectionId: f.key,
						name: r[0],
						index: currentCardNumber,
					})
					.onConflictDoNothing();
			}

			currentCardNumber = index;
		}

		json.push(collection);
		fs.writeFileSync(`${__dirname}/deck.json`, JSON.stringify(json, null, 2));
	}
})();
