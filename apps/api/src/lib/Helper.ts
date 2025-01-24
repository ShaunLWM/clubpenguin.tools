import { drizzle } from "drizzle-orm/node-postgres";
import { CardsRelations, CardsTable } from "../db/schema/Cards";
import {
	CollectionsRelations,
	CollectionsTable,
} from "../db/schema/Collection";
import { UsersTable } from "../db/schema/User";

export const RESTRICTED_USERNAMES = [
	"Rockhopper",
	"Aunt Arctic",
	"Arctic",
	"AuntArctic",
	"Cadence",
	"Gary",
	"Rookie",
	"Sensei",
	"PH",
	"Jet Pack Guy",
	"JetPackGuy",
	"Dot",
	"Puffle Handler",
	"PuffleHandler",
	"Herbert P. Bear",
	"HerbertPBear",
	"Herbert P Bear",
	"Darth Herbert",
	"DarthHerbert",
	"Franky",
	"Petey K",
	"PeteyK",
	"G Billy",
	"GBilly",
	"G-Billy",
	"Stomping Bob",
	"StompingBob",
	"Sam",
	"Sam The Sasquatch",
	"Rocky",
	"CeCe",
	"Brady",
	"McKenzie",
	"Kermit The Frog",
	"KermitTheFrog",
];

export const databaseUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

export const db = drizzle(databaseUrl, {
	schema: {
		CardsTable,
		CardsRelations,
		CollectionsRelations,
		CollectionsTable,
		UsersTable,
	},
});
