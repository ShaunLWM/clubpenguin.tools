import { Hono } from "hono";
import { db } from "../lib/Helper";

export const MainRoute = new Hono();

MainRoute.get("/", async (c) => {
	const results = await db.query.CollectionsTable.findMany({
		with: {
			cards: {
				columns: {
					name: true,
					index: true,
				},
			},
		},
	});

	return c.json(results);
});
