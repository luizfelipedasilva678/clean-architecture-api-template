import Fastify from "fastify";
import routesV1 from "@/main/config/routesV1";
import fastifyCookie from "@fastify/cookie";
import { fastifySession } from "@fastify/session";
import "dotenv/config";

declare module "fastify" {
	interface Session {
		user?: {
			id: string;
			login: string;
		};
		authenticated: boolean;
	}
}

async function init() {
	const app = Fastify({
		logger: true,
	});

	app.register(fastifyCookie);
	app.register(fastifySession, {
		cookieName: "sessionId",
		secret: process.env.COOKIE_SECRET ?? "simple-secret",
		cookie: { maxAge: 1800000, secure: false },
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
