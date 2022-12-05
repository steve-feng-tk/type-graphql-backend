import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable("users", function (table) {
        table.increments('user_id');
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.string('role')
        table.string('username')
        table.string('email')
        table.string('phone')
        table.string('password')
        table.datetime('last_access')
        table.timestamps()
    }).then(() => {
        console.log("Migration Success")
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('users')
}

