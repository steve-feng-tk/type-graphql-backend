import { Knex } from "knex";
import hash from '../../utils/hash';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const password = await hash.create('adminPassword')

    // Inserts seed entries
    await knex("users").insert([
        {
            user_id: 1,
            first_name: "Admin",
            last_name: "",
            role: "admin",
            username: "admin",
            email: "admin@email.com",
            password: password
        },
    ]);
};
