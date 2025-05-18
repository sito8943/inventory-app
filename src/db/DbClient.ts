import { invoke } from "@tauri-apps/api/core";
import { APIError } from "./types";

export default class DbClient {
  constructor() {}

  /**
   *
   * @param endpoint - backend endpoint
   * @param  value - value to insert
   * @returns inserted item
   */
  async post<TDto, TAddDto>(
    endpoint: string,
    value: TAddDto | TAddDto[],
  ): Promise<TDto> {
    const result = await invoke(endpoint, { data: value });
    if ((result as APIError).kind === "error")
      throw new Error((result as APIError).message);

    return result as TDto;
  }

  /**
   *
   * @param endpoint - backend endpoint
   * @param value - value to update
   * @returns updated item
   */
  async put<TDto, TUpdateDto>(
    endpoint: string,
    value: TUpdateDto,
  ): Promise<TDto> {
    const result = await invoke(endpoint, { data: value });
    if ((result as APIError).kind === "error")
      throw new Error((result as APIError).message);

    return result as TDto;
  }

  /**
   * Execute a select query with optional joins
   * @param endpoint - backend endpoint
   * @param query - Where conditions (key-value)
   * @returns Query result
   */
  async get<TDto, TFilter>(endpoint: string, query: TFilter): Promise<TDto[]> {
    const result = await invoke(endpoint, {
      filters: { ...query },
    });
    if ((result as APIError).kind === "error")
      throw new Error((result as APIError).message);

    return result as TDto[];
  }

  /**
   * Execute a select query with optional joins
   * @param endpoint - backend endpoint
   * @param query - Where conditions (key-value)
   * @returns Query result
   */
  async commonGet<TCommonDto, TFilter>(
    endpoint: string,
    query: TFilter,
  ): Promise<TCommonDto[]> {
    const result = await invoke(endpoint, {
      filters: { ...query },
    });
    if ((result as APIError).kind === "error")
      throw new Error((result as APIError).message);

    return result as TCommonDto[];
  }

  /**
   *
   * @param endpoint - backend endpoint
   * @param ids - ids to delete
   * @returns number of deleted items
   */
  async softDelete(endpoint: string, ids: number[]): Promise<number> {
    const result = await invoke(endpoint, { ids });
    if ((result as APIError).kind === "error")
      throw new Error((result as APIError).message);

    return result as number;
  }
}
