import { BcryptJsEncoder } from "@/external/encoder";
import { MySqlHelper } from "@/external/helpers";
import { InMariaDBRepository } from "@/external/repositories";
import { SignInWebController } from "@/presentation/controllers";
import { SignIn } from "@/use-cases/sign-in";

async function makeSignInWebController() {
	const encoder = new BcryptJsEncoder();
	const repository = new InMariaDBRepository(await MySqlHelper.getConnection());
	const useCase = new SignIn(repository, encoder);
	const controller = new SignInWebController(useCase);

	return controller;
}

export default makeSignInWebController;
