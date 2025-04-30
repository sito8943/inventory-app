use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(MovementLogs::Table)
                    .if_not_exists()
                    .col(pk_auto(MovementLogs::Id))
                    .col(ColumnDef::new(MovementLogs::Movement).integer().not_null())
                    .col(ColumnDef::new(MovementLogs::Product).integer().not_null())
                    .col(ColumnDef::new(MovementLogs::Stock).integer().not_null())
                    .col(ColumnDef::new(MovementLogs::Result).integer().not_null())
                    .col(
                        ColumnDef::new(MovementLogs::CreatedAt)
                            .timestamp()
                            .default(SimpleExpr::Keyword(Keyword::CurrentTimestamp)),
                    )
                    .col(
                        ColumnDef::new(MovementLogs::UpdatedAt)
                            .timestamp()
                            .default(SimpleExpr::Keyword(Keyword::CurrentTimestamp)),
                    )
                    .col(ColumnDef::new(MovementLogs::DeletedAt).timestamp())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(MovementLogs::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum MovementLogs {
    Table,
    Id,
    Movement,
    Product,
    Stock,
    Result,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
}
