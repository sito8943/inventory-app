use ::entity::{product, product::Entity as productEntity};
use sea_orm::*;

pub struct Query;

impl Query {

    pub async fn get_by_id(db: &DbConn, id: i32) -> Result<Option<product::Model>, DbErr> {
        productEntity::find_by_id(id).one(db).await
    }

    pub async fn get(
        db: &DbConn,
        filters: product::Filter,
    ) -> Result<(Vec<product::Model>, u64), DbErr> {
        use sea_orm::{ColumnTrait, Condition, EntityTrait, QueryFilter};

        let mut condition = Condition::all();

        if filters.deleted != Some(true) {
            condition = condition.add(product::Column::DeletedAt.is_null());
        }

        if let Some(search_term) = &filters.name {
            condition = condition.add(product::Column::Name.contains(search_term));
        }

        let result = product::Entity::find().filter(condition).all(db).await?;

        let count = result.len() as u64;
        Ok((result, count))
    }

    pub async fn common_get(
        db: &DbConn,
        filters: product::Filter,
    ) -> Result<(Vec<product::CommonDto>, u64), String> {
        let mut condition = Condition::all();

        if filters.deleted != Some(true) {
            condition = condition.add(product::Column::DeletedAt.is_null());
        }

        if let Some(search_term) = &filters.name {
            condition = condition.add(product::Column::Name.contains(search_term));
        }

        let categories = productEntity::find()
            .filter(condition)
            .order_by_asc(product::Column::Id)
            .all(db)
            .await
            .map_err(|e| e.to_string())?;

        let dto_list = categories
            .into_iter()
            .map(|model| product::CommonDto {
                id: model.id,
                name: model.name,
            })
            .collect::<Vec<_>>();
        let count = dto_list.len() as u64;

        Ok((dto_list, count))
    }
}