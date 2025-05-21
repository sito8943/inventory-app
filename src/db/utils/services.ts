import { config } from "../../config.ts";

const isAnError = (status: number) => status < 200 || status > 299;

/**
 * @description Make a request to the API
 * @param url - URL to make the request
 * @param method - Request method
 * @param body - Request body
 * @param h - Request headers
 * @returns Request response
 */
export async function makeRequest<TBody, TResponse>(
  url: string,
  method = "GET",
  body: TBody,
  h = null,
) {
  const headers = {
    "Content-Type": "application/json",
    ...(h ?? {}),
  };
  const options: RequestInit = {
    method,
    headers,
  };
  if (body) options.body = JSON.stringify(body);

  const request = await fetch(`${config.apiUrl}${url}`, options);
  const data: TResponse = await request.json();

  return {
    data,
    status: request.status,
    error: isAnError(request.status)
      ? { status: request.status, message: request.statusText }
      : null,
  };
}

export function buildQueryUrl(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null) // filtra valores no válidos
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");

  return queryString ? `${endpoint}?${queryString}` : endpoint;
}
