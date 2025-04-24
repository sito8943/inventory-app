// Prevents an additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use migration::{Migrator, MigratorTrait};
use serde::{Deserialize, Serialize};
use std::env;
use std::fs;
use sea_orm::{Database, DatabaseConnection};
use service::categories as CategoryService;
use service::products as ProductService;
use entity::{category, product};

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
            create_product,
            update_product,
            delete_product,
            list_products,
            product_by_id,
            // category crud
            create_categories,
            update_categories,
            delete_categories,
            list_categories,
            categories_by_id,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


#[tauri::command]
async fn create_product(state: tauri::State<'_, AppState>, form: product::Model) -> Result<FlashData, ()> {
    let _ = &state.conn;

    ProductService::Mutation::create(&state.conn, form)
        .await
        .expect("could not insert product");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "product successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn update_product(
    state: tauri::State<'_, AppState>,
    id: i32,
    form: product::Model,
) -> Result<FlashData, ()> {

    ProductService::Mutation::update(&state.conn, id, form)
        .await
        .expect("could not edit product");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "product successfully updated".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn delete_product(
    state: tauri::State<'_, AppState>,
    id: i32,
) -> Result<FlashData, ()> {
    ProductService::Mutation::delete(&state.conn, id)
        .await
        .expect("could not delete product");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "product successfully deleted".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn list_products(
    state: tauri::State<'_, AppState>,
    params: Params,
) -> Result<Vec<product::Model>, ()> {
    let page = params.page.unwrap_or(1);
    let items_per_page = params.items_per_page.unwrap_or(5);

    let (items, num_pages) = ProductService::Query::get(&state.conn, page, items_per_page)
        .await
        .expect("Cannot find products in page");

    println!("num_pages: {}", num_pages);

    Ok(items)
}

#[tauri::command]
async fn product_by_id(state: tauri::State<'_, AppState>, id: i32) -> Result<product::Model, ()> {
    let product = ProductService::Query::get_by_id(&state.conn, id)
        .await
        .expect("cannot find product by id")
        .ok_or(())?;

    Ok(product)
}

#[tauri::command]
async fn create_categories(state: tauri::State<'_, AppState>, form: category::AddCategoryDto) -> Result<FlashData, ()> {
    let _ = &state.conn;

    CategoryService::Mutation::create(&state.conn, form)
        .await
        .expect("could not insert category");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "category successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn update_categories(
    state: tauri::State<'_, AppState>,
    id: i32,
    form: category::Model,
) -> Result<FlashData, ()> {

    CategoryService::Mutation::update(&state.conn, id, form)
        .await
        .expect("could not edit category");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "category successfully updated".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn delete_categories(
    state: tauri::State<'_, AppState>,
    id: i32,
) -> Result<FlashData, ()> {
    ProductService::Mutation::delete(&state.conn, id)
        .await
        .expect("could not delete category");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "category successfully deleted".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn list_categories(
    state: tauri::State<'_, AppState>,
    params: Params,
) -> Result<Vec<category::Model>, ()> {
    let page = params.page.unwrap_or(1);
    let items_per_page = params.items_per_page.unwrap_or(5);

    let (items, num_pages) = CategoryService::Query::get(&state.conn, page, items_per_page)
        .await
        .expect("cannot find category in page");

    println!("num_pages: {}", num_pages);

    Ok(items)
}

#[tauri::command]
async fn categories_by_id(state: tauri::State<'_, AppState>, id: i32) -> Result<category::Model, ()> {
    let product = CategoryService::Query::get_by_id(&state.conn, id)
        .await
        .expect("cannot find category by id")
        .ok_or(())?;

    Ok(product)
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

#[derive(Deserialize)]
struct Params {
    page: Option<u64>,
    items_per_page: Option<u64>,
}