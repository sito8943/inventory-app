// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create categories table",
            sql: "CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                color TEXT,
                description TEXT,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                deletedAt TEXT DEFAULT NULL
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create products table",
            sql: "CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category INTEGER NOT NULL,
                price REAL DEFAULT 0,
                stock INTEGER DEFAULT 0,
                description TEXT,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                deletedAt TEXT DEFAULT NULL
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
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

                INSERT INTO movements (id, name, type)
                VALUES
                    (1, 'IN', 1),
                    (2, 'OUT', 2)
                ON CONFLICT(id) DO NOTHING;
            ",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:inventory-db.db", migrations)
                .build()
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
