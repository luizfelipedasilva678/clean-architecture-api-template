import { SignOutWebController } from "@/presentation/controllers";
import { SessionManager } from "@/presentation/ports";

async function makeSignOutWebController(sessionManager: SessionManager) {
  const controller = new SignOutWebController(sessionManager);

  return controller;
}

export default makeSignOutWebController;
