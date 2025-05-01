use ::entity::movement_log::Model;
use ::entity::{movement_log, movement_log::Entity as movement_logEntity};
use chrono::Utc;
use sea_orm::sea_query::{Keyword, SimpleExpr};
use sea_orm::ActiveValue::Set;
use sea_orm::*;

pub struct Mutation;

impl Mutation {
    pub async fn update(db: &DbConn, id: i32, form_data: Model) -> Result<Model, DbErr> {
        let mut movement_log: movement_log::ActiveModel = get_by_id(db, id).await?.into();

        movement_log.updated_at = Set(Utc::now());
        movement_log.movement = Set(form_data.movement);
        movement_log.product = Set(form_data.product);
        movement_log.stock = Set(form_data.stock);
        movement_log.result = Set(form_data.result);

        movement_log.update(db).await
    }

    pub async fn delete(db: &DbConn, id: i32) -> Result<Model, DbErr> {
        let mut movement_log: movement_log::ActiveModel = get_by_id(db, id).await?.into();

        movement_log.deleted_at = Set(Option::from(Utc::now()));

        movement_log.update(db).await
    }

    pub async fn delete_many(db: &DbConn, ids: Vec<i32>) -> Result<UpdateResult, DbErr> {
        use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

        movement_logEntity::update_many()
            .filter(movement_log::Column::Id.is_in(ids))
            .col_expr(
                movement_log::Column::DeletedAt,
                SimpleExpr::Keyword(Keyword::CurrentTimestamp),
            )
            .exec(db)
            .await
    }
}

async fn get_by_id(db: &DbConn, id: i32) -> Result<Model, DbErr> {
    movement_logEntity::find_by_id(id)
        .one(db)
        .await?
        .ok_or(DbErr::Custom("Cannot find movement_log.".to_owned()))
}
