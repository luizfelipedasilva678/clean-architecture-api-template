import { FastifyAdapter } from "@/main/adapters";
import { internalServerError } from "@/shared";
import { FastifyInstance } from "fastify";
import {
	makeCreateUserWebController,
	makeSignInWebController,
} from "@/main/factories";

function routesV1(
	app: FastifyInstance,
	_: Record<string, unknown>,
	done: (error?: Error) => void,
) {
	app.get("/", async (request, response) => {
		if (request.session.authenticated) {
			return response.send({
				message: `Hello, ${request?.session?.user?.login}`,
			});
		}

		return response.send({
			message: "Hello, visitor",
		});
	});

	app.post("/users", async (request, response) => {
		try {
			const controller = await makeCreateUserWebController();
			const controllerResponse = await controller.execute(
				FastifyAdapter.adapt(request),
			);

			response
				.code(controllerResponse.statusCode)
				.send(controllerResponse.body);
		} catch (err) {
			const serverError = internalServerError();
			response.code(serverError.statusCode).send(serverError.body);
		}
	});

	app.post("/sign-in", async (request, response) => {
		try {
			const controller = await makeSignInWebController();
			const controllerResponse = await controller.execute(
				FastifyAdapter.adapt(request),
			);

			if (request.session.authenticated) {
				return response.redirect("/");
			}

			request.session.user = {
				id: controllerResponse.body.id,
				login: controllerResponse.body.login,
			};
			request.session.authenticated = true;

			return response
				.code(controllerResponse.statusCode)
				.send(controllerResponse.body);
		} catch (err) {
			const serverError = internalServerError();
			response.code(serverError.statusCode).send(serverError.body);
		}
	});

	app.get("/sign-out", async (request, response) => {
		if (request.session.authenticated) {
			request.session.authenticated = false;
			await request.session.destroy();

			return response.redirect("/");
		}
	});

	done();
}

export default routesV1;
