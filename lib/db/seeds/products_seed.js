/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {
      "productId": 1,
      "productName": "fugiat exercitation adipisicing",
      "inventoryQuantity": 43,
      "shipOnWeekends": true,
      "maxBusinessDaysToShip": 13
    },
    {
      "productId": 2,
      "productName": "mollit cupidatat Lorem",
      "inventoryQuantity": 70,
      "shipOnWeekends": true,
      "maxBusinessDaysToShip": 18
    },
    {
      "productId": 3,
      "productName": "non quis sint",
      "inventoryQuantity": 33,
      "shipOnWeekends": false,
      "maxBusinessDaysToShip": 15
    },
    {
      "productId": 4,
      "productName": "voluptate cupidatat non",
      "inventoryQuantity": 52,
      "shipOnWeekends": false,
      "maxBusinessDaysToShip": 18
    },
    {
      "productId": 5,
      "productName": "anim amet occaecat",
      "inventoryQuantity": 39,
      "shipOnWeekends": true,
      "maxBusinessDaysToShip": 19
    },
    {
      "productId": 6,
      "productName": "cillum deserunt elit",
      "inventoryQuantity": 47,
      "shipOnWeekends": false,
      "maxBusinessDaysToShip": 20
    },
    {
      "productId": 7,
      "productName": "adipisicing reprehenderit et",
      "inventoryQuantity": 71,
      "shipOnWeekends": false,
      "maxBusinessDaysToShip": 15
    },
    {
      "productId": 8,
      "productName": "ex mollit laboris",
      "inventoryQuantity": 80,
      "shipOnWeekends": false,
      "maxBusinessDaysToShip": 15
    }
  ]);
};
