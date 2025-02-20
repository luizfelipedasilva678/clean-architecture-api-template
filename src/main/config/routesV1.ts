import { FastifyAdapter, FastifySessionManagerAdapter } from "@/main/adapters";
import { internalServerError } from "@/shared";
import type { FastifyInstance } from "fastify";
import {
  makeCreateUserWebController,
  makeSignInWebController,
  makeSignOutWebController,
} from "@/main/factories";

function routesV1(
  app: FastifyInstance,
  _: Record<string, unknown>,
  done: (error?: Error) => void
) {
  const serverError = internalServerError();

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
        FastifyAdapter.adapt(request)
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
      const sessionManger = new FastifySessionManagerAdapter(request.session);
      const controller = await makeSignInWebController(sessionManger);
      const controllerResponse = await controller.execute(
        FastifyAdapter.adapt(request)
      );

      if ("url" in controllerResponse) {
        return response.redirect(
          app.prefix + controllerResponse.url,
          controllerResponse.statusCode
        );
      }

      return response
        .code(controllerResponse.statusCode)
        .send(controllerResponse.body);
    } catch (err) {
      response.code(serverError.statusCode).send(serverError.body);
    }
  });

  app.get("/sign-out", async (request, response) => {
    try {
      const sessionManger = new FastifySessionManagerAdapter(request.session);
      const controller = await makeSignOutWebController(sessionManger);
      const controllerResponse = await controller.execute();

      if ("url" in controllerResponse) {
        return response.redirect(
          app.prefix + controllerResponse.url,
          controllerResponse.statusCode
        );
      }

      return response
        .code(controllerResponse.statusCode)
        .send(controllerResponse.body);
    } catch (err) {
      response.code(serverError.statusCode).send(serverError.body);
    }
  });

  done();
}

export default routesV1;
