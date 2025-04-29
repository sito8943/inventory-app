// Prevents an additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use entity::{category, movement, product};
use migration::{Migrator, MigratorTrait};
use sea_orm::{Database, DatabaseConnection};
use serde::{Deserialize, Serialize};
use service::categories as CategoryService;
use service::movements as MovementService;
use service::products as ProductService;
use std::env;
use std::fs;

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

//# region Products
#[tauri::command]
async fn create_products(
    state: tauri::State<'_, AppState>,
    form: product::AddDto,
) -> Result<FlashData, ()> {
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
async fn create_many_products(
    state: tauri::State<'_, AppState>,
    items: Vec<product::AddDto>,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    ProductService::Mutation::create_many(&state.conn, items)
        .await
        .expect("could not insert products");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "products successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn update_products(
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
async fn delete_many_products(
    state: tauri::State<'_, AppState>,
    ids: Vec<i32>,
) -> Result<FlashData, ()> {
    ProductService::Mutation::delete_many(&state.conn, ids)
        .await
        .expect("could not delete products");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "products successfully deleted".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn list_products(
    state: tauri::State<'_, AppState>,
    filters: product::Filter,
) -> Result<Vec<product::Model>, ()> {
    let (items, _) = ProductService::Query::get(&state.conn, filters)
        .await
        .expect("Cannot find products in page");

    Ok(items)
}

#[tauri::command]
async fn list_common_products(
    state: tauri::State<'_, AppState>,
    filters: product::Filter,
) -> Result<Vec<product::CommonDto>, ()> {
    let (items, _) = ProductService::Query::common_get(&state.conn, filters)
        .await
        .expect("cannot find products");

    Ok(items)
}

#[tauri::command]
async fn products_by_id(state: tauri::State<'_, AppState>, id: i32) -> Result<product::Model, ()> {
    let product = ProductService::Query::get_by_id(&state.conn, id)
        .await
        .expect("cannot find product by id")
        .ok_or(())?;

    Ok(product)
}

//#endregion Products

//#region Categories

#[tauri::command]
async fn create_categories(
    state: tauri::State<'_, AppState>,
    form: category::AddDto,
) -> Result<FlashData, ()> {
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
async fn create_many_categories(
    state: tauri::State<'_, AppState>,
    items: Vec<category::AddDto>,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    CategoryService::Mutation::create_many(&state.conn, items)
        .await
        .expect("could not insert categories");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "categories successfully added".to_owned(),
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
async fn delete_many_categories(
    state: tauri::State<'_, AppState>,
    ids: Vec<i32>,
) -> Result<FlashData, ()> {
    CategoryService::Mutation::delete_many(&state.conn, ids)
        .await
        .expect("could not delete categories");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "categories successfully deleted".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn list_categories(
    state: tauri::State<'_, AppState>,
    filters: category::Filter,
) -> Result<Vec<category::Model>, ()> {
    let (items, _) = CategoryService::Query::get(&state.conn, filters)
        .await
        .expect("cannot find categories");

    Ok(items)
}

#[tauri::command]
async fn list_common_categories(
    state: tauri::State<'_, AppState>,
    filters: category::Filter,
) -> Result<Vec<category::CommonDto>, ()> {
    let (items, _) = CategoryService::Query::common_get(&state.conn, filters)
        .await
        .expect("cannot find categories");

    Ok(items)
}

#[tauri::command]
async fn categories_by_id(
    state: tauri::State<'_, AppState>,
    id: i32,
) -> Result<category::Model, ()> {
    let product = CategoryService::Query::get_by_id(&state.conn, id)
        .await
        .expect("cannot find category by id")
        .ok_or(())?;

    Ok(product)
}

//#endregion Categories

//#region Movements

#[tauri::command]
async fn create_movements(
    state: tauri::State<'_, AppState>,
    form: movement::AddDto,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    MovementService::Mutation::create(&state.conn, form)
        .await
        .expect("could not insert movement");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn create_many_movements(
    state: tauri::State<'_, AppState>,
    items: Vec<movement::AddDto>,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    MovementService::Mutation::create_many(&state.conn, items)
        .await
        .expect("could not insert movements");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movements successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn update_movements(
    state: tauri::State<'_, AppState>,
    id: i32,
    form: movement::Model,
) -> Result<FlashData, ()> {
    MovementService::Mutation::update(&state.conn, id, form)
        .await
        .expect("could not edit movement");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement successfully updated".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn delete_many_movements(
    state: tauri::State<'_, AppState>,
    ids: Vec<i32>,
) -> Result<FlashData, ()> {
    MovementService::Mutation::delete_many(&state.conn, ids)
        .await
        .expect("could not delete movements");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movements successfully deleted".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn list_movements(
    state: tauri::State<'_, AppState>,
    filters: movement::Filter,
) -> Result<Vec<movement::Model>, ()> {
    let (items, _) = MovementService::Query::get(&state.conn, filters)
        .await
        .expect("cannot find movement in page");

    Ok(items)
}

#[tauri::command]
async fn list_common_movements(
    state: tauri::State<'_, AppState>,
    filters: movement::Filter,
) -> Result<Vec<movement::CommonDto>, ()> {
    let (items, _) = MovementService::Query::common_get(&state.conn, filters)
        .await
        .expect("cannot find movement in page");

    Ok(items)
}

#[tauri::command]
async fn movements_by_id(
    state: tauri::State<'_, AppState>,
    id: i32,
) -> Result<movement::Model, ()> {
    let product = MovementService::Query::get_by_id(&state.conn, id)
        .await
        .expect("cannot find movement by id")
        .ok_or(())?;

    Ok(product)
}

//#endregion Movements

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
