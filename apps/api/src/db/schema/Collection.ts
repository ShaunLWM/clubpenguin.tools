import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { CardsTable } from "./Cards";

export const CollectionsTable = pgTable("Collections", {
	key: varchar({ length: 25 }).primaryKey().unique(),
	name: varchar({ length: 50 }).notNull().unique(),
	img: varchar({ length: 100 }),
});

export const CollectionsRelations = relations(CollectionsTable, ({ many }) => ({
	cards: many(CardsTable),
}));
