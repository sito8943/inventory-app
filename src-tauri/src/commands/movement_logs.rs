use crate::{AppState, FlashData};
use entity::movement_log;
use service::movement_logs as MovementLogService;

//#region MovementLogs

#[tauri::command]
pub async fn create_movement_logs(
    state: tauri::State<'_, AppState>,
    form: movement_log::AddDto,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    MovementLogService::Mutation::create(&state.conn, form)
        .await
        .expect("could not insert movement log");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement log successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn create_many_movement_logs(
    state: tauri::State<'_, AppState>,
    items: Vec<movement_log::AddDto>,
) -> Result<FlashData, ()> {
    let _ = &state.conn;

    MovementLogService::Mutation::create_many(&state.conn, items)
        .await
        .expect("could not insert movement logs");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement logs successfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn update_movement_logs(
    state: tauri::State<'_, AppState>,
    id: i32,
    form: movement_log::Model,
) -> Result<FlashData, ()> {
    MovementLogService::Mutation::update(&state.conn, id, form)
        .await
        .expect("could not edit movement log");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement log successfully updated".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn delete_many_movement_logs(
    state: tauri::State<'_, AppState>,
    ids: Vec<i32>,
) -> Result<FlashData, ()> {
    MovementLogService::Mutation::delete_many(&state.conn, ids)
        .await
        .expect("could not delete movement logs");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "movement logs successfully deleted".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
pub async fn list_movement_logs(
    state: tauri::State<'_, AppState>,
    filters: movement_log::Filter,
) -> Result<Vec<movement_log::Model>, ()> {
    let (items, _) = MovementLogService::Query::get(&state.conn, filters)
        .await
        .expect("cannot find movement log in page");

    Ok(items)
}

#[tauri::command]
pub async fn list_common_movement_logs(
    state: tauri::State<'_, AppState>,
    filters: movement_log::Filter,
) -> Result<Vec<movement_log::CommonDto>, ()> {
    let (items, _) = MovementLogService::Query::common_get(&state.conn, filters)
        .await
        .expect("cannot find movement log in page");

    Ok(items)
}

#[tauri::command]
pub async fn movement_logs_by_id(
    state: tauri::State<'_, AppState>,
    id: i32,
) -> Result<movement_log::Model, ()> {
    let product = MovementLogService::Query::get_by_id(&state.conn, id)
        .await
        .expect("cannot find movement log by id")
        .ok_or(())?;

    Ok(product)
}

//#endregion MovementLogs
