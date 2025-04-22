// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create categories and products table and relationship",
            sql: "
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                color TEXT,
                description TEXT,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                deletedAt TEXT DEFAULT NULL
            );

            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL DEFAULT 0,
                cost REAL DEFAULT 0,
                stock INTEGER DEFAULT 0,
                description TEXT,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                deletedAt TEXT DEFAULT NULL
            );

            CREATE TABLE IF NOT EXISTS productCategories (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  product INTEGER NOT NULL,
                  category INTEGER NOT NULL,
                  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (product) REFERENCES products(id) ON DELETE CASCADE,
                  FOREIGN KEY (category) REFERENCES categories(id) ON DELETE CASCADE
              );
          ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create movements and movementLogs tables",
            sql: "
                CREATE TABLE IF NOT EXISTS movements (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    type BYTE DEFAULT 1,
                    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                    deletedAt TEXT DEFAULT NULL
                );

                CREATE TABLE IF NOT EXISTS movementLogs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    product INTEGER NOT NULL,
                    movement INTEGER NOT NULL,
                    stock INTEGER NOT NULL,
                    result INTEGER NOT NULL,
                    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (product) REFERENCES products(id) ON DELETE CASCADE,
                    FOREIGN KEY (movement) REFERENCES movements(id) ON DELETE CASCADE
                );
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create indicators and plans tables and relationships",
            sql: "
            CREATE TABLE IF NOT EXISTS indicators (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                deletedAt TEXT DEFAULT NULL
            );

            CREATE TABLE IF NOT EXISTS behaviors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                indicator INTEGER NOT NULL,
                movement INTEGER NOT NULL,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (indicator) REFERENCES indicators(id) ON DELETE CASCADE,
                FOREIGN KEY (movement) REFERENCES movements(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS plans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                frequency TEXT,
                goal REAL DEFAULT 0,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                deletedAt TEXT DEFAULT NULL
            );

            CREATE TABLE IF NOT EXISTS planIndicators (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                plan INTEGER NOT NULL,
                indicator INTEGER NOT NULL,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (indicator) REFERENCES indicators(id) ON DELETE CASCADE,
                FOREIGN KEY (plan) REFERENCES plans(id) ON DELETE CASCADE
            );
          ",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:base.db", migrations)
                .build()
        )
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
