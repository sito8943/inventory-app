use ::entity::{movement, movement::Entity as movementEntity};
use sea_orm::*;

pub struct Query;

impl Query {
    pub async fn get_by_id(db: &DbConn, id: i32) -> Result<Option<movement::Model>, DbErr> {
        movementEntity::find_by_id(id).one(db).await
    }

    /// If ok, returns (movement models, num pages).
    pub async fn get(
        db: &DbConn,
        filters: movement::MovementFilter,
    ) -> Result<(Vec<movement::Model>, u64), DbErr> {
        use sea_orm::{ColumnTrait, Condition, EntityTrait, QueryFilter};

        let mut condition = Condition::all();

        if filters.deleted != Some(true) {
            condition = condition.add(movement::Column::DeletedAt.is_null());
        }

        if let Some(search_term) = &filters.name {
            condition = condition.add(movement::Column::Name.contains(search_term));
        }

        let result = movement::Entity::find().filter(condition).all(db).await?;

        let count = result.len() as u64;
        Ok((result, count))
    }

    pub async fn common_get(
        db: &DbConn,
    ) -> Result<(Vec<movement::CommonMovementDto>, u64), String> {
        // Setup paginator
        let categories = movementEntity::find()
            .filter(movement::Column::DeletedAt.is_not_null())
            .order_by_asc(movement::Column::Id)
            .all(db)
            .await
            .map_err(|e| e.to_string())?;

        let dto_list = categories
            .into_iter()
            .map(|model| movement::CommonMovementDto {
                id: model.id,
                name: model.name,
            })
            .collect::<Vec<_>>();
        let count = dto_list.len() as u64;

        Ok((dto_list, count))
    }
}
