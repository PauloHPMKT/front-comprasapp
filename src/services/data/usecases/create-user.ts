import { User } from "../../../core/entities/User";
import { CreateUserModel } from "../../../core/models/create-user";
import { ApiService } from "../../api/api-service";

export class CreateUserUseCase {
  constructor(private readonly apiService: ApiService) {}

  async execute(data: CreateUserModel.Params): Promise<User> {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    } as CreateUserModel.Params;

    return await this.apiService.createResource(userData);
  }
}