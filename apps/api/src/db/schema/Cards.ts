import { relations } from "drizzle-orm";
import {
	type AnyPgColumn,
	integer,
	pgTable,
	varchar,
} from "drizzle-orm/pg-core";
import { CollectionsTable } from "./Collection";

export const CardsTable = pgTable("Cards", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 60 }),
	index: integer().notNull(),
	collectionId: varchar({ length: 25 }).references(
		(): AnyPgColumn => CollectionsTable.key,
	),
});

export const CardsRelations = relations(CardsTable, ({ one }) => ({
	collection: one(CollectionsTable, {
		fields: [CardsTable.collectionId],
		references: [CollectionsTable.key],
	}),
}));
