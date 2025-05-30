// Prevents an additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use tauri::path;
use tauri_plugin_fs::FsExt;

#[tokio::main]
pub async fn run() {
    env::set_var("RUST_LOG", "debug");
    tracing_subscriber::fmt::init();

    dotenvy::dotenv().ok();

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
                // allowed the given directory
                let scope = app.fs_scope();
                scope.allow_directory(app.path().app_data_dir().unwrap(), false).expect("TODO: panic message");

                Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
