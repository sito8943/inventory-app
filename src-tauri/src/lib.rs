// Prevents an additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use entity::{category, product, movement};
use migration::{Migrator, MigratorTrait};
use sea_orm::{Database, DatabaseConnection};
use serde::{Deserialize, Serialize};
use service::categories as CategoryService;
use service::products as ProductService;
use service::movements as MovementService;
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
            delete_products,
            list_products,
            products_by_id,
            // category crud
            create_categories,
            create_many_categories,
            update_categories,
            delete_categories,
            list_categories,
            categories_by_id,
            // movement crud
            create_movements,
            create_many_movements,
            update_movements,
            delete_movements,
            list_movements,
            movements_by_id,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


//# region Products
#[tauri::command]
async fn create_products(
    state: tauri::State<'_, AppState>,
    form: product::AddProductDto,
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
    items: Vec<product::AddProductDto>,
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
async fn delete_products(state: tauri::State<'_, AppState>, id: i32) -> Result<FlashData, ()> {
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
    form: category::AddCategoryDto,
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
    items: Vec<category::AddCategoryDto>,
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
async fn delete_many_categories(state: tauri::State<'_, AppState>, ids: Vec<i32>) -> Result<FlashData, ()> {
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
    filters: category::CategoryFilter,
) -> Result<Vec<category::Model>, ()> {
    let (items, num_pages) = CategoryService::Query::get(&state.conn, filters)
        .await
        .expect("cannot find categories");

    println!("num_pages: {}", num_pages);

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
    form: movement::AddMovementDto,
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
    items: Vec<movement::AddMovementDto>,
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
async fn delete_movements(state: tauri::State<'_, AppState>, id: i32) -> Result<FlashData, ()> {
    ProductService::Mutation::delete(&state.conn, id)
        .await
        .expect("could not delete movement");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement successfully deleted".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn list_movements(
    state: tauri::State<'_, AppState>,
    filters: movement::MovementFilter,
) -> Result<Vec<movement::Model>, ()> {
    let (items, num_pages) = MovementService::Query::get(&state.conn, filters)
        .await
        .expect("cannot find movement in page");

    println!("num_pages: {}", num_pages);

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

#[derive(Deserialize)]
struct Params {
    page: Option<u64>,
    items_per_page: Option<u64>,
}
