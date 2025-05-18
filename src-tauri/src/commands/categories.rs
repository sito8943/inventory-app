use entity::category;
use service::categories as CategoryService;
use crate::{AppState, FlashData};

//#region Categories

#[tauri::command]
pub async fn create_categories(
    state: tauri::State<'_, AppState>,
    data: category::AddDto,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    CategoryService::Mutation::create(&state.conn, data)
        .await
        .expect("could not insert category");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "category successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn create_many_categories(
    state: tauri::State<'_, AppState>,
    data: Vec<category::AddDto>,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    CategoryService::Mutation::create_many(&state.conn, data)
        .await
        .expect("could not insert categories");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "categories successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn update_categories(
    state: tauri::State<'_, AppState>,
    data: category::UpdateDto,
) -> Result<FlashData, ()> {
    CategoryService::Mutation::update(&state.conn, data.id, data)
        .await
        .expect("could not edit category");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "category successfully updated".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn delete_many_categories(
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
pub async fn list_categories(
    state: tauri::State<'_, AppState>,
    filters: category::Filter,
) -> Result<Vec<category::Model>, ()> {
    let (items, _) = CategoryService::Query::get(&state.conn, filters)
        .await
        .expect("cannot find categories");

    Ok(items)
}

#[tauri::command]
pub async fn list_common_categories(
    state: tauri::State<'_, AppState>,
    filters: category::Filter,
) -> Result<Vec<category::CommonDto>, ()> {
    let (items, _) = CategoryService::Query::common_get(&state.conn, filters)
        .await
        .expect("cannot find categories");

    Ok(items)
}

#[tauri::command]
pub async fn categories_by_id(
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
