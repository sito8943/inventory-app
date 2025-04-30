use ::entity::movement::Model;
use ::entity::{movement, movement::Entity as movementEntity};
use chrono::Utc;
use sea_orm::sea_query::{Keyword, SimpleExpr};
use sea_orm::ActiveValue::Set;
use sea_orm::*;

pub struct Mutation;

impl Mutation {
    pub async fn create(
        db: &DbConn,
        form_data: movement::AddDto,
    ) -> Result<movement::ActiveModel, DbErr> {
        movement::ActiveModel {
            name: Set(form_data.name),
            r#type: Set(form_data.r#type),
            description: Set(form_data.description),
            ..Default::default()
        }
        .save(db)
        .await
    }

    pub async fn create_many(db: &DbConn, items: Vec<movement::AddDto>) -> Result<i32, DbErr> {
        let active_models: Vec<movement::ActiveModel> = items
            .into_iter()
            .map(|p| movement::ActiveModel {
                name: Set(p.name),
                r#type: Set(p.r#type),
                description: Set(p.description),
                created_at: Set(Utc::now()),
                updated_at: Set(Utc::now()),
                ..Default::default()
            })
            .collect();

        movement::Entity::insert_many(active_models.clone())
            .exec(db)
            .await?;

        Ok(active_models.len() as i32)
    }

    pub async fn update(db: &DbConn, id: i32, form_data: Model) -> Result<Model, DbErr> {
        let mut movement: movement::ActiveModel = get_by_id(db, id).await?.into();

        movement.updated_at = Set(Utc::now());
        movement.name = Set(form_data.name);
        movement.r#type = Set(form_data.r#type);
        movement.description = Set(form_data.description);

        movement.update(db).await
    }

    pub async fn delete(db: &DbConn, id: i32) -> Result<Model, DbErr> {
        let mut movement: movement::ActiveModel = get_by_id(db, id).await?.into();

        movement.deleted_at = Set(Option::from(Utc::now()));

        movement.update(db).await
    }

    pub async fn delete_many(db: &DbConn, ids: Vec<i32>) -> Result<UpdateResult, DbErr> {
        use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

        movementEntity::update_many()
            .filter(movement::Column::Id.is_in(ids))
            .col_expr(
                movement::Column::DeletedAt,
                SimpleExpr::Keyword(Keyword::CurrentTimestamp),
            )
            .exec(db)
            .await
    }
}

async fn get_by_id(db: &DbConn, id: i32) -> Result<Model, DbErr> {
    movementEntity::find_by_id(id)
        .one(db)
        .await?
        .ok_or(DbErr::Custom("Cannot find movement.".to_owned()))
}
