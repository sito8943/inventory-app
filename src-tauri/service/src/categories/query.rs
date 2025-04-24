use ::entity::{category, category::Entity as categoryEntity};
use sea_orm::*;

pub struct Query;

impl Query {
    pub async fn get_by_id(db: &DbConn, id: i32) -> Result<Option<category::Model>, DbErr> {
        categoryEntity::find_by_id(id).one(db).await
    }

    /// If ok, returns (category models, num pages).
    pub async fn get(
        db: &DbConn,
        filters: category::CategoryFilter,
    ) -> Result<(Vec<category::Model>, u64), DbErr> {
        use sea_orm::{ColumnTrait, Condition, EntityTrait, QueryFilter};

        let mut condition = Condition::all();

        if filters.deleted != Some(true) {
            condition = condition.add(category::Column::DeletedAt.is_null());
        }

        if let Some(search_term) = &filters.name {
            condition = condition.add(category::Column::Name.contains(search_term));
        }

        let result = category::Entity::find()
            .filter(condition)
            .all(db)
            .await?;

        let count = result.len() as u64;
        Ok((result, count))
    }

    pub async fn common_get(
        db: &DbConn,
    ) -> Result<(Vec<category::CommonCategoryDto>, u64), String> {
        // Setup paginator
        let categories = categoryEntity::find()
            .filter(category::Column::DeletedAt.is_not_null())
            .order_by_asc(category::Column::Id)
            .all(db)
            .await
            .map_err(|e| e.to_string())?;

        let dto_list = categories
            .into_iter()
            .map(|model| category::CommonCategoryDto {
                id: model.id,
                name: model.name,
            })
            .collect::<Vec<_>>();
        let count = dto_list.len() as u64;

        Ok((dto_list, count))
    }
}
