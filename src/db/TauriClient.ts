import { BaseDirectory, readFile, create } from "@tauri-apps/plugin-fs";

export default class TauriClient {
  constructor() {}

  async readFile(file: string) {
    return await readFile(file, {
      baseDir: BaseDirectory.Home,
    });
  }

  async createFile(paramFile: string, content: string) {
    const file = await create(paramFile, {
      baseDir: BaseDirectory.AppData,
    });
    await file.write(new TextEncoder().encode(content));
    await file.close();
  }
}
