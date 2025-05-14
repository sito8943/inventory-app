import { invoke } from "@tauri-apps/api/core";

export default class DbClient {
  constructor() {}

  /**
   *
   * @param endpoint - backend endpoint
   * @param  value - value to insert
   * @returns inserted item
   */
  async post<TAddDto>(
    endpoint: string,
    value: TAddDto | TAddDto[],
  ): Promise<TAddDto> {
    return await invoke(endpoint, { data: value });
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
    return await invoke(endpoint, { data: value });
  }

  /**
   * Execute a select query with optional joins
   * @param endpoint - backend endpoint
   * @param query - Where conditions (key-value)
   * @returns Query result
   */
  async get<TDto, TFilter>(endpoint: string, query: TFilter): Promise<TDto[]> {
    return await invoke(endpoint, {
      filters: { ...query },
    });
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
    return await invoke(endpoint, {
      filters: { ...query },
    });
  }

  /**
   *
   * @param endpoint - backend endpoint
   * @param ids - ids to delete
   * @returns number of deleted items
   */
  async softDelete(endpoint: string, ids: number[]): Promise<number> {
    return await invoke(endpoint, { ids });
  }
}
