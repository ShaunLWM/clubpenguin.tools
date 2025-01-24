import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const UserStatusEnum = pgEnum("status", [
	"PENDING",
	"ACTIVE",
	"BANNED",
	"DELETED",
]);

export const UsersTable = pgTable("Users", {
	id: varchar().primaryKey().unique(), // clerk
	collections: text().default("[]"),
	username: varchar({ length: 20 }).unique(),
	status: UserStatusEnum().default("ACTIVE"),
});
