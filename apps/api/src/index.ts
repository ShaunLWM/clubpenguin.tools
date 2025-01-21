import "dotenv/config";

import { clerkMiddleware } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { MainRoute } from "./routes/main";
import { UserRoute } from "./routes/user";

const app = new Hono();

app.use("*", clerkMiddleware());
app.use(compress());
app.use(
	cors({
		origin: "*",
		allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
	}),
);

app.route("/", MainRoute);
app.route("/user", UserRoute);

const port = 3005;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
