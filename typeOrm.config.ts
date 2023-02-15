import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions } from "typeorm-extension"
import { MainSeeder } from "./src/database/seeder/main.seeder";
import { config } from 'dotenv';

config({ path: `.env` });

const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_POST ? parseInt(process.env.MYSQL_POST) : undefined,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    synchronize: false,
    logging: false,
    entities: [
        "src/module/**/entities/*.ts"
    ],
    migrations: [
        "src/database/migration/**/*.ts"
    ],
    subscribers: [],
    cache: true,
    seeds: [MainSeeder],
    factories: ['src/database/factory/**/*{.ts,.js}'],
};
console.log(options);
export const AppDataSource = new DataSource(options)
