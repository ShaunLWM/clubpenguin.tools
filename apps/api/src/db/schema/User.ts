import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("Users", {
	id: varchar().primaryKey().unique(), // clerk
	collections: text().default("[]"),
	username: varchar({ length: 20 }).unique(),
});
