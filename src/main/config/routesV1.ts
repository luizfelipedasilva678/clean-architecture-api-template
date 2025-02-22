import { FastifyAdapter } from "@/main/adapters";
import type { HttpRedirect, HttpResponse } from "@/presentation/ports";
import { internalServerError } from "@/shared";
import type { FastifyInstance, FastifyReply } from "fastify";
import { FastifySessionManagerAdapter } from "@/external/session-manager";
import {
	makeCreateUserWebController,
	makeSignInWebController,
	makeGetLoggedUserWebController,
	makeSignOutWebController,
} from "@/main/factories";

function routesV1(
	app: FastifyInstance,
	_: Record<string, unknown>,
	done: (error?: Error) => void,
) {
	app.get("/", async (_, response) => {
		response.send({
			message: "Clean Arch Template",
		});
	});

	app.get("/session", async (request, response) => {
		try {
			const sessionManager = new FastifySessionManagerAdapter(request.session);
			const controller = await makeGetLoggedUserWebController(sessionManager);
			const controllerResponse = await controller.execute();

			return sendResponse(response, controllerResponse);
		} catch (err) {
			return handleError(response);
		}
	});

	app.post("/users", async (request, response) => {
		try {
			const sessionManager = new FastifySessionManagerAdapter(request.session);
			const controller = await makeCreateUserWebController(sessionManager);
			const controllerResponse = await controller.execute(
				FastifyAdapter.adapt(request),
			);

			if (shouldRedirect(controllerResponse))
				return redirect(response, app.prefix + controllerResponse.url);

			return sendResponse(response, controllerResponse);
		} catch (err) {
			return handleError(response);
		}
	});

	app.post("/sign-in", async (request, response) => {
		try {
			const sessionManager = new FastifySessionManagerAdapter(request.session);
			const controller = await makeSignInWebController(sessionManager);
			const controllerResponse = await controller.execute(
				FastifyAdapter.adapt(request),
			);

			if (shouldRedirect(controllerResponse))
				return redirect(response, app.prefix + controllerResponse.url);

			return sendResponse(response, controllerResponse);
		} catch (err) {
			return handleError(response);
		}
	});

	app.get("/sign-out", async (request, response) => {
		try {
			const sessionManager = new FastifySessionManagerAdapter(request.session);
			const controller = await makeSignOutWebController(sessionManager);
			const controllerResponse = await controller.execute();

			if (shouldRedirect(controllerResponse))
				return redirect(response, app.prefix + controllerResponse.url);

			return sendResponse(response, controllerResponse);
		} catch (err) {
			return handleError(response);
		}
	});

	done();
}

function shouldRedirect(response: HttpRedirect | HttpResponse) {
	return "url" in response;
}

function redirect(response: FastifyReply, location: string) {
	return response.redirect(location);
}

function handleError(response: FastifyReply) {
	const serverError = internalServerError();
	return response.code(serverError.statusCode).send(serverError.body);
}

function sendResponse(
	response: FastifyReply,
	controllerResponse: HttpResponse,
) {
	return response
		.code(controllerResponse.statusCode)
		.send(controllerResponse.body);
}

export default routesV1;
