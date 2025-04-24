use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Movements::Table)
                    .if_not_exists()
                    .col(pk_auto(Movements::Id))
                    .col(ColumnDef::new(Movements::Name).string().not_null())
                    .col(ColumnDef::new(Movements::Description).string())
                    .col(ColumnDef::new(Movements::Type).integer().not_null())
                    .col(
                        ColumnDef::new(Movements::CreatedAt)
                            .timestamp()
                            .default(SimpleExpr::Keyword(Keyword::CurrentTimestamp)),
                    )
                    .col(
                        ColumnDef::new(Movements::UpdatedAt)
                            .timestamp()
                            .default(SimpleExpr::Keyword(Keyword::CurrentTimestamp)),
                    )
                    .col(ColumnDef::new(Movements::DeletedAt).timestamp())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Movements::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Movements {
    Table,
    Id,
    Name,
    Description,
    Type,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
}
