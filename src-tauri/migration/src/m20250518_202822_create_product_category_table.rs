use sea_orm_migration::{prelude::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(ProductCategory::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(ProductCategory::ProductId).integer())
                    .col(ColumnDef::new(ProductCategory::CategoryId).integer())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(ProductCategory::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum ProductCategory {
    Table,
    ProductId,
    CategoryId,
}
