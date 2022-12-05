// Update with your config settings.
import * as dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT ? +process.env.MYSQL_PORT : undefined,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    supportBigNumbers: true,
    multipleStatements: true,
    timezone: 'Z',
  },
  migrations: {
    extension: 'ts',
    tableName: 'migrations'
  }
};

export default config