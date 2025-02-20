import type { HttpRequest } from "@/presentation/ports";
import type { FastifyRequest } from "fastify";

class FastifyAdapter {
	static adapt(request: FastifyRequest): HttpRequest {
		return {
			body: request.body as Record<string, any>,
		};
	}
}

export default FastifyAdapter;
