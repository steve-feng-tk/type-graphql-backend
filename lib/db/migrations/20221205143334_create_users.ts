import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable("users", function (table) {
        table.increments('user_id');
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).nullable();
        table.string('role').notNullable();
        table.string('username')
        table.string('email').notNullable();
        table.string('phone')
        table.string('password').notNullable();
        table.datetime('last_access')
        table.timestamps()
    }).then(() => {
        console.log("Created users table")
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('users').then(() => {
        console.log('Dropped users table')
    })
}

