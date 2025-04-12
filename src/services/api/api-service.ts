import { HttpPostClient } from "../data/protocols/api-connection";

export class ApiService {
  constructor(private readonly httpPostClient: HttpPostClient) {}

  async createResource(data: object): Promise<any> {
    return this.httpPostClient.post('/signup', data);
  }
}