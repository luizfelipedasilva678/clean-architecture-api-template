import type { CreateUserDTO, UseCase, UserDTO } from "@/use-cases/ports";
import type {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/ports";
import {
  InvalidInputError,
  type LoginExistsError,
} from "@/use-cases/create-user/errors";

type CreateUserUseCase = UseCase<
  CreateUserDTO,
  UserDTO | LoginExistsError | InvalidInputError
>;

class CreateUserWebController implements Controller<HttpRequest, HttpResponse> {
  private readonly useCase: CreateUserUseCase;

  public constructor(useCase: CreateUserUseCase) {
    this.useCase = useCase;
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const body: CreateUserDTO = {
      login: request?.body?.login ?? "",
      name: request?.body?.name ?? "",
      password: request?.body?.password ?? "",
    };

    const opResult = await this.useCase.execute(body);

    if (opResult instanceof Error) {
      return {
        statusCode: 400,
        body: {
          message: opResult.message,
          ...(opResult instanceof InvalidInputError
            ? { details: opResult.details }
            : {}),
        },
      };
    }

    return {
      statusCode: 200,
      body: {
        id: opResult.id,
        login: opResult.login,
        name: opResult.name,
      },
    };
  }
}

export default CreateUserWebController;
