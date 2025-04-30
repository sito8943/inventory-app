// Prevents an additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use migration::{Migrator, MigratorTrait};
use sea_orm::{Database, DatabaseConnection};
use serde::{Deserialize, Serialize};

use crate::commands::{
    categories::{
        categories_by_id, create_categories, create_many_categories, delete_many_categories,
        list_categories, list_common_categories, update_categories,
    },
    movements::{
        create_many_movements, create_movements, delete_many_movements, list_common_movements,
        list_movements, movements_by_id, update_movements,
    },
    products::{
        create_products, create_many_products, delete_many_products, list_common_products, list_products, products_by_id,
        update_products,
    },
};

use std::env;
use std::fs;

mod commands;

#[tokio::main]
pub async fn run() {
    env::set_var("RUST_LOG", "debug");
    tracing_subscriber::fmt::init();

    dotenvy::dotenv().ok();

    let data_dir = ".tauri-seaorm-template/data";
    if let Err(_) = fs::metadata(&data_dir) {
        fs::create_dir_all(&data_dir).expect("Could not create data directory");
    }

    let db_url = "sqlite://".to_string() + data_dir + "/inventory-db.sqlite?mode=rwc";
    //let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");

    let conn = Database::connect(db_url)
        .await
        .expect("Database connection failed");
    Migrator::up(&conn, None).await.unwrap();

    let state = AppState { conn };

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            greet,
            // product crud
            create_products,
            create_many_products,
            update_products,
            delete_many_products,
            list_products,
            list_common_products,
            products_by_id,
            // category crud
            create_categories,
            create_many_categories,
            update_categories,
            delete_many_categories,
            list_categories,
            list_common_categories,
            categories_by_id,
            // movement crud
            create_movements,
            create_many_movements,
            update_movements,
            delete_many_movements,
            list_movements,
            list_common_movements,
            movements_by_id,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Clone)]
struct AppState {
    conn: DatabaseConnection,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
struct FlashData {
    kind: String,
    message: String,
}
