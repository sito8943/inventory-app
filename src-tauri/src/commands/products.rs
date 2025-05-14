use entity::product;
use service::products as ProductService;
use crate::{AppState, FlashData};

//# region Products
#[tauri::command]
pub async fn create_products(
    state: tauri::State<'_, AppState>,
    data: product::AddDto,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    ProductService::Mutation::create(&state.conn, data)
        .await
        .expect("could not insert product");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "product successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn create_many_products(
    state: tauri::State<'_, AppState>,
    data: Vec<product::AddDto>,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    ProductService::Mutation::create_many(&state.conn, data)
        .await
        .expect("could not insert products");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "products successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn update_products(
    state: tauri::State<'_, AppState>,
    id: i32,
    data: product::Model,
) -> Result<FlashData, ()> {
    ProductService::Mutation::update(&state.conn, id, data)
        .await
        .expect("could not edit product");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "product successfully updated".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn delete_many_products(
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
pub async fn list_products(
    state: tauri::State<'_, AppState>,
    filters: product::Filter,
) -> Result<Vec<product::Model>, ()> {
    let (items, _) = ProductService::Query::get(&state.conn, filters)
        .await
        .expect("Cannot find products in page");

    Ok(items)
}

#[tauri::command]
pub async fn list_common_products(
    state: tauri::State<'_, AppState>,
    filters: product::Filter,
) -> Result<Vec<product::CommonDto>, ()> {
    let (items, _) = ProductService::Query::common_get(&state.conn, filters)
        .await
        .expect("cannot find products");

    Ok(items)
}

#[tauri::command]
pub async fn products_by_id(state: tauri::State<'_, AppState>, id: i32) -> Result<product::Model, ()> {
    let product = ProductService::Query::get_by_id(&state.conn, id)
        .await
        .expect("cannot find product by id")
        .ok_or(())?;

    Ok(product)
}

//#endregion Products
