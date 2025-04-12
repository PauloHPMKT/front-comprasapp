import { ApiService } from "../../api/api-service";
import { AxiosHttpClient } from "../../api/http";
import { CreateUserUseCase } from "../../data/usecases/create-user";

export const makeCreateUserUseCase = (): CreateUserUseCase => {
  const httpClient = new AxiosHttpClient();
  const apiService = new ApiService(httpClient);

  return new CreateUserUseCase(apiService);
}