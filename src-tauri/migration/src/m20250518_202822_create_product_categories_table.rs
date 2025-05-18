use sea_orm_migration::{prelude::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(ProductCategories::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(ProductCategories::ProductId).integer())
                    .col(ColumnDef::new(ProductCategories::CategoryId).integer())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(ProductCategories::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum ProductCategories {
    Table,
    ProductId,
    CategoryId,
}
