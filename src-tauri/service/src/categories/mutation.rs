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
        form_data: category::AddCategoryDto,
    ) -> Result<category::ActiveModel, DbErr> {
        let category::AddCategoryDto {
            name,
            color,
            description,
            ..
        } = form_data;

        category::ActiveModel {
            name: Set(name),
            color: Set(color),
            description: Set(description),
            ..Default::default()
        }
        .save(db)
        .await
    }

    pub async fn update(
        db: &DbConn,
        id: i32,
        form_data: Model,
    ) -> Result<Model, DbErr> {
        let mut category: category::ActiveModel = get_by_id(db, id).await?.into();

        let Model {
            name,
            color,
            description,
            ..
        } = form_data;

        category.updated_at = Set(Utc::now());
        category.name = Set(name);
        category.color = Set(color);
        category.description = Set(description);

        category.update(db).await
    }

    pub async fn delete(db: &DbConn, id: i32) -> Result<Model, DbErr> {
        let mut category: category::ActiveModel = get_by_id(db, id).await?.into();

        category.deleted_at = Set(Utc::now());

        category.update(db).await
    }

    pub async fn delete_many(
        db: &DbConn,
        ids: Vec<i32>,
    ) -> Result<UpdateResult, DbErr> {
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
