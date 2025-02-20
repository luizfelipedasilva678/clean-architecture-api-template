import Fastify from "fastify";
import routesV1 from "@/main/config/setupV1Routes";
import "dotenv/config";

async function init() {
	const app = Fastify({
		logger: true,
	});

	try {
		app.register(routesV1, { prefix: "api/v1" });

		await app.listen({
			port: 3000,
		});
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

init();
