use ::entity::product::Model;
use ::entity::{movement, movement_log};
use ::entity::{product, product::Entity as productEntity};
use chrono::Utc;
use sea_orm::sea_query::{Keyword, SimpleExpr};
use sea_orm::ActiveValue::Set;
use sea_orm::*;

use crate::{movements};

pub struct Mutation;

impl Mutation {
    pub async fn create(
        db: &DbConn,
        form_data: product::AddDto,
    ) -> Result<product::ActiveModel, DbErr> {
        product::ActiveModel {
            name: Set(form_data.name),
            price: Set(form_data.price),
            cost: Set(form_data.cost),
            stock: Set(form_data.stock),
            description: Set(form_data.description),
            ..Default::default()
        }
        .save(db)
        .await
    }

    pub async fn do_movement(db: &DbConn, form_data: movement_log::DoMovementDto) -> Result<Model, DbErr> {
        let mut product: product::ActiveModel = get_by_id(db, form_data.product).await?.into();

        let movement: movement::ActiveModel = movements::Query::get_by_id(db, form_data.movement)
            .await?
            .ok_or(DbErr::Custom("Cannot find movement.".to_owned()))?
            .into();

        let mut count: i32 = form_data.count;

        if movement.r#type.as_ref() == &(movement::MovementTypes::Out as i32) {
            count *= -1;
        }

        let new_stock: i32 = product.stock.unwrap() + count;

        if new_stock < 0 {
            return Err(DbErr::Custom("Cannot have negative stock.".to_owned()));
        }

        movement_log::ActiveModel {
            product: Set(form_data.id),
            movement: Set(form_data.movement),
            stock: Set(form_data.count),
            result: Set(new_stock),
            ..Default::default()
        }
            .save(db)
            .await.expect("Error saving movement log");

        product.stock = Set(new_stock);
        product.update(db).await
    }

    pub async fn create_many(db: &DbConn, items: Vec<product::AddDto>) -> Result<i32, DbErr> {
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

        product::Entity::insert_many(active_models.clone())
            .exec(db)
            .await?;

        Ok(active_models.len() as i32)
    }

    pub async fn update(db: &DbConn, id: i32, form_data: Model) -> Result<Model, DbErr> {
        let mut product: product::ActiveModel = get_by_id(db, id).await?.into();

        product.updated_at = Set(Utc::now());
        product.name = Set(form_data.name);
        product.price = Set(form_data.price);
        product.cost = Set(form_data.cost);
        product.stock = Set(form_data.stock);
        product.description = Set(form_data.description);

        product.update(db).await
    }

    pub async fn delete(db: &DbConn, id: i32) -> Result<Model, DbErr> {
        let mut product: product::ActiveModel = get_by_id(db, id).await?.into();

        product.deleted_at = Set(Option::from(Utc::now()));

        product.update(db).await
    }

    pub async fn delete_many(db: &DbConn, ids: Vec<i32>) -> Result<UpdateResult, DbErr> {
        use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

        productEntity::update_many()
            .filter(product::Column::Id.is_in(ids))
            .col_expr(
                product::Column::DeletedAt,
                SimpleExpr::Keyword(Keyword::CurrentTimestamp),
            )
            .exec(db)
            .await
    }
}

async fn get_by_id(db: &DbConn, id: i32) -> Result<Model, DbErr> {
    productEntity::find_by_id(id)
        .one(db)
        .await?
        .ok_or(DbErr::Custom("Cannot find product.".to_owned()))
}
