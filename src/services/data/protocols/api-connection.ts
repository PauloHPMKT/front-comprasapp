export interface HttpPostClient {
  post<T>(url: string, body: object): Promise<T>;
}