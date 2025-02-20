import { FastifyAdapter, FastifySessionManagerAdapter } from "@/main/adapters";
import type { HttpRedirect, HttpResponse } from "@/presentation/ports";
import { internalServerError } from "@/shared";
import type { FastifyInstance, FastifyReply } from "fastify";
import makeWelcomeMessageWebService from "../factories/makeWelcomeMessageWebService";
import {
	makeCreateUserWebController,
	makeSignInWebController,
	makeSignOutWebService,
} from "@/main/factories";
import makeGetSessionService from "../factories/makeGetSessionService";

function routesV1(
	app: FastifyInstance,
	_: Record<string, unknown>,
	done: (error?: Error) => void,
) {
	app.get("/session", async (request, response) => {
		try {
			const sessionManager = new FastifySessionManagerAdapter(request.session);
			const service = await makeGetSessionService(sessionManager);
			const serviceResponse = await service.execute();

			return sendResponse(response, serviceResponse);
		} catch (err) {
			return handleError(response);
		}
	});

	app.get("/", async (request, response) => {
		try {
			const sessionManager = new FastifySessionManagerAdapter(request.session);
			const service = await makeWelcomeMessageWebService(sessionManager);
			const serviceResponse = await service.execute();

			return sendResponse(response, serviceResponse);
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
			const service = await makeSignOutWebService(sessionManager);
			const serviceResponse = await service.execute();

			if (shouldRedirect(serviceResponse))
				return redirect(response, app.prefix + serviceResponse.url);

			return sendResponse(response, serviceResponse);
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
