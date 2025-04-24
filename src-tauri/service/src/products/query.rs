use ::entity::{product, product::Entity as productEntity};
use sea_orm::*;

pub struct Query;

impl Query {

    pub async fn get_by_id(db: &DbConn, id: i32) -> Result<Option<product::Model>, DbErr> {
        productEntity::find_by_id(id).one(db).await
    }

    /// If ok, returns (product models, num pages).
    pub async fn get(
        db: &DbConn,
        page: u64,
        items_per_page: u64,
    ) -> Result<(Vec<product::Model>, u64), DbErr> {
        // Setup paginator
        let paginator = productEntity::find()
            .order_by_asc(product::Column::Id)
            .paginate(db, items_per_page);
        let num_pages = paginator.num_pages().await?;

        // Fetch paginated products
        paginator.fetch_page(page - 1).await.map(|p| (p, num_pages))
    }
}