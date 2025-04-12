import axios, { AxiosInstance } from "axios";
import { HttpPostClient } from "../data/protocols/api-connection";

export class AxiosHttpClient implements HttpPostClient {
  private readonly axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3005/api",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async post<T>(url: string, body: object): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, body);
    return response.data;
  }
}
