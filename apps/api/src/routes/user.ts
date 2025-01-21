import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { UsersTable } from "../db/schema/User";
import { db } from "../lib/Helper";

export const UserRoute = new Hono();

UserRoute.get("/", async (c) => {
	const auth = getAuth(c);
	console.log(auth);
	if (auth?.userId) {
		await db
			.insert(UsersTable)
			.values({ id: auth.userId })
			.onConflictDoNothing();
	}

	return c.json({
		message: "Hello World",
	});
});
