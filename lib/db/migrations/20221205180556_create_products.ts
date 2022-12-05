import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable("products", function (table) {
        table.increments('productId');
        table.string('productName')
        table.integer('inventoryQuantity')
        table.boolean('shipOnWeekends')
        table.integer('maxBusinessDaysToShip')
        table.timestamps()
    }).then(() => {
        console.log("Created products table")
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('products').then(() => {
        console.log("Dropped products table")
    })
}

