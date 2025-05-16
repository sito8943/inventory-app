import { invoke } from "@tauri-apps/api/core";

// manager
import DbClient from "./DbClient.ts";

// types
import { BaseCommonEntityDto, BaseEntityDto, DeleteDto } from "lib";
import { Tables } from "./types";

export default class BaseClient<
  TDto extends BaseEntityDto,
  TCommonDto extends BaseCommonEntityDto,
  TAddDto,
  TUpdateDto extends DeleteDto,
  TFilter,
> {
  table: Tables;
  db: DbClient = new DbClient();

  /**
   *
   * @param {string} table
   */
  constructor(table: Tables) {
    this.table = table;
  }

  /**
   *
   * @param value
   * @returns inserted item
   */
  async insert(value: TAddDto): Promise<TDto> {
    return await this.db.post<TDto, TAddDto>(`create_${this.table}`, value);
  }

  /**
   *
   * @param values
   * @returns count of items inserted
   */
  async insertMany(values: TAddDto[]): Promise<number> {
    await this.db.post<TDto, TAddDto>(`create_many_${this.table}`, values);
    return values.length;
  }

  /**
   *
   * @param value
   * @returns updated item
   */
  async update(value: TUpdateDto): Promise<TDto> {
    return await this.db.put<TDto, TUpdateDto>(`update_${this.table}`, value);
  }

  /**
   *
   * @param query - Where conditions (key-value)
   * @returns - Query result
   */
  async get(query: TFilter): Promise<TDto[]> {
    return await this.db.get<TDto, TFilter>(`list_${this.table}`, query);
  }

  /**
   *
   * @param query - Where conditions (key-value)
   * @returns  - Query result
   */
  async commonGet(query: TFilter): Promise<TCommonDto[]> {
    return await this.db.commonGet<TCommonDto, TFilter>(
      `list_common_${Tables.MovementLogs}`,
      query,
    );
  }

  /**
   *
   * @param id
   * @returns - Query result
   */
  async getById(id: number): Promise<TDto> {
    return await invoke(`${this.table}_by_id`, { id });
  }

  async softDelete(ids: number[]): Promise<number> {
    return await this.db.softDelete(`delete_many_${this.table}`, ids);
  }
}
