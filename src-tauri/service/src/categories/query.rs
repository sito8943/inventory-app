use ::entity::{category, category::Entity as categoryEntity};
use sea_orm::*;

pub struct Query;

impl Query {
    pub async fn get_by_id(
        db: &DbConn,
        id: i32,
    ) -> Result<Option<category::Model>, DbErr> {
        categoryEntity::find_by_id(id).one(db).await
    }

    /// If ok, returns (category models, num pages).
    pub async fn get(
        db: &DbConn,
        page: u64,
        items_per_page: u64,
    ) -> Result<(Vec<category::Model>, u64), DbErr> {
        // Setup paginator
        let paginator = categoryEntity::find()
            .order_by_asc(category::Column::Id)
            .paginate(db, items_per_page);
        let num_pages = paginator.num_pages().await?;

        // Fetch paginated categories
        paginator.fetch_page(page - 1).await.map(|p| (p, num_pages))
    }
}
