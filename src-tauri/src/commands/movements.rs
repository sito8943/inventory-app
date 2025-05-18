use entity::movement;
use service::movements as MovementService;
use crate::{AppState, FlashData};

//#region Movements

#[tauri::command]
pub async fn create_movements(
    state: tauri::State<'_, AppState>,
    data: movement::AddDto,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    MovementService::Mutation::create(&state.conn, data)
        .await
        .expect("could not insert movement");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn create_many_movements(
    state: tauri::State<'_, AppState>,
    data: Vec<movement::AddDto>,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    MovementService::Mutation::create_many(&state.conn, data)
        .await
        .expect("could not insert movements");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movements successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn update_movements(
    state: tauri::State<'_, AppState>,
    data: movement::UpdateDto,
) -> Result<FlashData, ()> {
    MovementService::Mutation::update(&state.conn, data.id, data)
        .await
        .expect("could not edit movement");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement successfully updated".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn delete_many_movements(
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
pub async fn list_movements(
    state: tauri::State<'_, AppState>,
    filters: movement::Filter,
) -> Result<Vec<movement::Model>, ()> {
    let (items, _) = MovementService::Query::get(&state.conn, filters)
        .await
        .expect("cannot find movement in page");

    Ok(items)
}

#[tauri::command]
pub async fn list_common_movements(
    state: tauri::State<'_, AppState>,
    filters: movement::Filter,
) -> Result<Vec<movement::CommonDto>, ()> {
    let (items, _) = MovementService::Query::common_get(&state.conn, filters)
        .await
        .expect("cannot find movement in page");

    Ok(items)
}

#[tauri::command]
pub async fn movements_by_id(
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