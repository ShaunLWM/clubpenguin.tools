import { drizzle } from "drizzle-orm/node-postgres";
import { CardsRelations, CardsTable } from "../db/schema/Cards";
import {
	CollectionsRelations,
	CollectionsTable,
} from "../db/schema/Collection";
import { UsersTable } from "../db/schema/User";

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
