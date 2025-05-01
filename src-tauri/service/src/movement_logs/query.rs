use ::entity::{movement_log, movement_log::Entity as movement_logEntity};
use sea_orm::*;

pub struct Query;

impl Query {
    pub async fn get_by_id(db: &DbConn, id: i32) -> Result<Option<movement_log::Model>, DbErr> {
        movement_logEntity::find_by_id(id).one(db).await
    }

    /// If ok, returns (movement_log models, num pages).
    pub async fn get(
        db: &DbConn,
        filters: movement_log::Filter,
    ) -> Result<(Vec<movement_log::Model>, u64), DbErr> {
        use sea_orm::{ColumnTrait, Condition, EntityTrait, QueryFilter};

        let mut condition = Condition::all();

        if filters.deleted != Some(true) {
            condition = condition.add(movement_log::Column::DeletedAt.is_null());
        }

        condition = condition.add(movement_log::Column::Product.eq(filters.product));

        let result = movement_log::Entity::find().filter(condition).all(db).await?;

        let count = result.len() as u64;
        Ok((result, count))
    }

    pub async fn common_get(
        db: &DbConn,
        filters: movement_log::Filter,
    ) -> Result<(Vec<movement_log::CommonDto>, u64), String> {
        let mut condition = Condition::all();

        if filters.deleted != Some(true) {
            condition = condition.add(movement_log::Column::DeletedAt.is_null());
        }

        condition = condition.add(movement_log::Column::Product.eq(filters.product));

        let categories = movement_logEntity::find()
            .filter(condition)
            .order_by_asc(movement_log::Column::Id)
            .all(db)
            .await
            .map_err(|e| e.to_string())?;

        let dto_list = categories
            .into_iter()
            .map(|model| movement_log::CommonDto {
                id: model.id,
                product: model.product,
                movement: model.movement,
                stock: model.stock,
                result: model.result,
                updated_at: model.updated_at,
            })
            .collect::<Vec<_>>();
        let count = dto_list.len() as u64;

        Ok((dto_list, count))
    }
}
