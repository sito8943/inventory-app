use ::entity::{product, product::Entity as productEntity};
use chrono::Utc;
use ::entity::product::Model;
use sea_orm::ActiveValue::Set;
use sea_orm::*;
use sea_orm::sea_query::{Keyword, SimpleExpr};

pub struct Mutation;

impl Mutation {
    pub async fn create(
        db: &DbConn,
        form_data: product::AddProductDto,
    ) -> Result<product::ActiveModel, DbErr> {
        let product::AddProductDto {
            name,
            price,
            cost,
            stock,
            description,
            ..
        } = form_data;

        product::ActiveModel {
            name: Set(name),
            price: Set(price),
            cost: Set(cost),
            stock: Set(stock),
            description: Set(description),
            ..Default::default()
        }
            .save(db)
            .await
    }

    pub async fn create_many(
        db: &DbConn,
        items: Vec<product::AddProductDto>,
    ) -> Result<i32, DbErr> {
        let active_models: Vec<product::ActiveModel> = items
            .into_iter()
            .map(|p| product::ActiveModel {
                name: Set(p.name),
                price: Set(p.price),
                cost: Set(p.cost),
                stock: Set(p.stock),
                description: Set(p.description),
                created_at: Set(Utc::now()),
                updated_at: Set(Utc::now()),
                ..Default::default()
            })
            .collect();

        product::Entity::insert_many(active_models.clone()).exec(db).await?;

        Ok(active_models.len() as i32)
    }

    pub async fn update(
        db: &DbConn,
        id: i32,
        form_data: Model,
    ) -> Result<Model, DbErr> {
        let mut product: product::ActiveModel = get_by_id(db, id).await?.into();

        let Model {
            name,
            price,
            cost,
            stock,
            description,
            ..
        } = form_data;

        product.updated_at = Set(Utc::now());
        product.name = Set(name);
        product.price = Set(price);
        product.cost = Set(cost);
        product.stock = Set(stock);
        product.description = Set(description);

        product.update(db).await
    }

    pub async fn delete(db: &DbConn, id: i32) -> Result<Model, DbErr> {
        let mut product: product::ActiveModel = get_by_id(db, id).await?.into();

        product.deleted_at = Set(Option::from(Utc::now()));

        product.update(db).await
    }

    pub async fn delete_many(db: &DbConn, ids: Vec<i32>) -> Result<UpdateResult, DbErr> {
        use sea_orm::{EntityTrait, ColumnTrait, QueryFilter};

        productEntity::update_many()
            .filter(product::Column::Id.is_in(ids))
            .col_expr(product::Column::DeletedAt, SimpleExpr::Keyword(Keyword::CurrentTimestamp))
            .exec(db)
            .await
    }
}

async fn get_by_id(db: &DbConn, id: i32) -> Result<Model, DbErr>  {
    productEntity::find_by_id(id)
        .one(db)
        .await?
        .ok_or(DbErr::Custom("Cannot find product.".to_owned()))
}
