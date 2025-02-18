function ok(body: any) {
	return {
		statusCode: 200,
		body,
	};
}

function internalServerError() {
	return {
		statusCode: 500,
		body: {
			message: "Internal Server Error",
		},
	};
}

function created(body: any) {
	return {
		statusCode: 201,
		body,
	};
}

function badRequest(body: any) {
	return {
		statusCode: 400,
		body,
	};
}

export { ok, created, badRequest, internalServerError };
