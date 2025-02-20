import { internalServerError, redirect } from "@/shared";
import {
  Controller,
  HttpResponse,
  HttpRedirect,
  SessionManager,
} from "@/presentation/ports";

class SignOutWebController
  implements Controller<void, HttpResponse | HttpRedirect>
{
  private readonly sessionManager: SessionManager;

  constructor(sessionManager: SessionManager) {
    this.sessionManager = sessionManager;
  }

  public async execute(): Promise<HttpResponse | HttpRedirect> {
    try {
      if (this.sessionManager.get().authenticated) {
        await this.sessionManager.destroy();
      }

      return redirect("/");
    } catch (err) {
      return internalServerError();
    }
  }
}

export default SignOutWebController;
