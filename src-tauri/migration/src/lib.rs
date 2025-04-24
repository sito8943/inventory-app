pub use sea_orm_migration::prelude::*;
mod m20250423_155544_create_product_table;
mod m20250423_171435_create_category_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250423_155544_create_product_table::Migration),
            Box::new(m20250423_171435_create_category_table::Migration),
        ]
    }
}
