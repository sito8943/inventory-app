use ::entity::category::Model;
use ::entity::{category, category::Entity as categoryEntity};
use chrono::Utc;
use sea_orm::sea_query::{Keyword, SimpleExpr};
use sea_orm::ActiveValue::Set;
use sea_orm::*;

pub struct Mutation;

impl Mutation {
    pub async fn create(
        db: &DbConn,
        form_data: category::AddDto,
    ) -> Result<category::ActiveModel, DbErr> {
        category::ActiveModel {
            name: Set(form_data.name),
            color: Set(form_data.color),
            description: Set(form_data.description),
            ..Default::default()
        }
        .save(db)
        .await
    }

    pub async fn create_many(db: &DbConn, items: Vec<category::AddDto>) -> Result<i32, DbErr> {
        let active_models: Vec<category::ActiveModel> = items
            .into_iter()
            .map(|p| category::ActiveModel {
                name: Set(p.name),
                color: Set(p.color),
                description: Set(p.description),
                created_at: Set(Utc::now()),
                updated_at: Set(Utc::now()),
                ..Default::default()
            })
            .collect();

        category::Entity::insert_many(active_models.clone())
            .exec(db)
            .await?;

        Ok(active_models.len() as i32)
    }

    pub async fn update(db: &DbConn, id: i32, form_data: Model) -> Result<Model, DbErr> {
        let mut category: category::ActiveModel = get_by_id(db, id).await?.into();

        category.updated_at = Set(Utc::now());
        category.name = Set(form_data.name);
        category.color = Set(form_data.color);
        category.description = Set(form_data.description);

        category.update(db).await
    }

    pub async fn delete_many(db: &DbConn, ids: Vec<i32>) -> Result<UpdateResult, DbErr> {
        use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

        categoryEntity::update_many()
            .filter(category::Column::Id.is_in(ids))
            .col_expr(
                category::Column::DeletedAt,
                SimpleExpr::Keyword(Keyword::CurrentTimestamp),
            )
            .exec(db)
            .await
    }
}

async fn get_by_id(db: &DbConn, id: i32) -> Result<Model, DbErr> {
    categoryEntity::find_by_id(id)
        .one(db)
        .await?
        .ok_or(DbErr::Custom("Cannot find category.".to_owned()))
}
