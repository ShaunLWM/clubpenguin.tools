import download from "download";
import fs from "node:fs";

const DOWNLOAD_IMG = false;
const MISSING_IDS = [
	739, 796, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812,
	813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 1933, 2169, 5494, 5517,
	5518, 6266, 7197, 7200, 7201, 7209, 7210, 7211, 7214, 7215, 7216, 7217, 7218,
	7219, 7225, 8000, 8001, 8002, 8003, 8004, 8005, 8006, 8007, 8008, 8009, 8010,
	8011, 15046, 21031, 24152, 24248, 24257, 24258, 24259, 24260,
];

const DOWNLOAD_MISSING_ONLY = true;

type REPORTED_JSON_TYPE = Array<{
	type: number;
	name: string;
	items: Array<{
		i: number; // item id
		n: string; // name
		m: boolean; // is member
	}>;
}>;

(async () => {
	const ClothingType: Record<number, string> = {
		1: "color",
		2: "head",
		3: "face",
		4: "neck",
		5: "body",
		6: "hands",
		7: "feet",
		8: "pin",
		9: "background",
		10: "flag",
		11: "photo",
		12: "award",
	};

	const items = JSON.parse(
		fs.readFileSync(`${__dirname}/paper.json`, "utf8"),
	) as Array<{
		paper_item_id: number;
		type: number;
		cost: number;
		is_member: boolean;
		label: string;
		prompt: string;
		layer: number;
		is_bait?: string;
	}>;

	const json: REPORTED_JSON_TYPE = [];

	const missingIds: Array<number> = [];

	if (!DOWNLOAD_MISSING_ONLY) {
		for (const item of items) {
			try {
				if (!ClothingType[item.type]) {
					console.error("[+] Invalid type", item.type);
					continue;
				}

				await download(
					`https://clubpenguinmountains.com/wp-content/plugins/puffles-playercard-generator/assets/${item.paper_item_id}.png`,
					`${__dirname}/paper/${ClothingType[item.type]}`,
					{
						filename: `${item.paper_item_id}.png`,
					},
				);

				const typeIndex = json.findIndex((i) => i.type === item.type);
				if (typeIndex < 0) {
					json.push({
						type: item.type,
						name: ClothingType[item.type],
						items: [
							{
								i: item.paper_item_id,
								n: item.label,
								m: item.is_member,
							},
						],
					});
					continue;
				}

				json[typeIndex].items.push({
					i: item.paper_item_id,
					n: item.label,
					m: item.is_member,
				});
				console.log(item.paper_item_id);
			} catch (error) {
				if (typeof item.is_bait !== "undefined") {
					continue;
				}

				console.log(error);
				missingIds.push(item.paper_item_id);
			}
		}

		fs.writeFileSync(`${__dirname}/items.json`, JSON.stringify(json, null, 2));
		console.log({ missingIds });
	}

	const REPORTED_JSON = JSON.parse(
		fs.readFileSync(`${__dirname}/items.json`, "utf8"),
	) as REPORTED_JSON_TYPE;

	for (const id of [...MISSING_IDS, ...missingIds]) {
		const paperItem = items.find((i) => i.paper_item_id === id);
		if (!paperItem || paperItem?.is_bait) {
			console.error("Missing paper id", id);
			continue;
		}

		const existingTypeId = REPORTED_JSON.findIndex(
			(i) => i.type === paperItem.type,
		);
		if (existingTypeId < 0) {
			console.error("Missing type id", paperItem.type);
			continue;
		}

		const existingItemId = REPORTED_JSON[existingTypeId].items.findIndex(
			(i) => i.i === id,
		);
		if (existingItemId > -1) {
			console.error("Already exist item id", id);
			continue;
		}

		REPORTED_JSON[existingTypeId].items.push({
			i: paperItem.paper_item_id,
			n: paperItem.label,
			m: paperItem.is_member,
		});

		console.log(
			paperItem.label,
			ClothingType[paperItem.type],
			`https://icerink.solero.me/mobcdn.clubpenguin.com/game/items/images/paper/image/600/${paperItem.paper_item_id}.png`,
		);
	}

	fs.writeFileSync(
		`${__dirname}/items.json`,
		JSON.stringify(REPORTED_JSON, null, 2),
	);
})();
