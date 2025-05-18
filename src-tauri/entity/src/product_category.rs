use sea_orm::entity::prelude::*;
use crate::product;
use crate::category;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "product_categories")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub product_id: i32,
    #[sea_orm(primary_key)]
    pub category_id: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "product::Entity",
        from = "Column::ProductId",
        to = "product::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Product,

    #[sea_orm(
        belongs_to = "category::Entity",
        from = "Column::CategoryId",
        to = "category::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Category,
}

impl Related<product::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Product.def()
    }
}

impl Related<category::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Category.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
