import Fastify from "fastify";
import routesV1 from "@/main/config/routesV1";
import fastifyCookie from "@fastify/cookie";
import { fastifySession } from "@fastify/session";
import type { Session as PresentationSession } from "@/presentation/ports/session-manager";
import fastifyHelmet from "@fastify/helmet";
import cors from "@fastify/cors";
import "dotenv/config";

declare module "fastify" {
	interface Session extends PresentationSession {}
}

async function init() {
	const app = Fastify({
		logger: true,
	});

	app.register(fastifyCookie);
	app.register(fastifyHelmet);
	app.register(cors, {
		origin: process.env.ALLOWED_ORIGINS ?? "http://localhost:5000",
		credentials: true,
	});
	app.register(fastifySession, {
		cookieName: "sId",
		secret: process.env.COOKIE_SECRET ?? "simple-secret",
		cookie: {
			maxAge: 1800000,
			secure: "auto",
			sameSite: "lax",
			httpOnly: true,
		},
	});
	app.register(routesV1, { prefix: "/api/v1" });

	try {
		await app.listen({
			port: Number(process.env.SERVER_PORT ?? 3000),
		});
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

init();
