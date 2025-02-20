import type { IncomingMessage, ServerResponse } from "node:http";
import { makeCreateUserWebController } from "../factories";
import { FastifyAdapter } from "@/main/adapters";
import { internalServerError } from "@/presentation/controllers/helpers";
import type {
	FastifyBaseLogger,
	FastifyInstance,
	FastifyPluginOptions,
	FastifyTypeProvider,
	RawServerDefault,
} from "fastify";

type Server = FastifyInstance<
	RawServerDefault,
	IncomingMessage,
	ServerResponse<IncomingMessage>,
	FastifyBaseLogger,
	FastifyTypeProvider
>;

function routesV1(
	app: Server,
	_: FastifyPluginOptions,
	done: (err?: Error) => void,
) {
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

	done();
}

export default routesV1;
