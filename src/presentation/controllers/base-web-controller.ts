class BaseWebController {
	protected getMissingParams(
		requiredParams: string[],
		params: Record<string, any> = {},
	): string[] {
		const missingParams: string[] = [];
		const sendedParams = Object.keys(params);

		for (const param of requiredParams) {
			if (!sendedParams.includes(param)) {
				missingParams.push(param);
			}
		}

		return missingParams;
	}
}

export default BaseWebController;
