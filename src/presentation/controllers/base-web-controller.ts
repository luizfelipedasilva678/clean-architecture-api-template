class BaseWebController {
	getMissingParams(
		requiredParams: string[],
		params: Record<string, any>,
	): string[] {
		const missingParams: string[] = [];

		for (const param of requiredParams) {
			if (!params[param]) {
				missingParams.push(param);
			}
		}

		return missingParams;
	}
}

export default BaseWebController;
