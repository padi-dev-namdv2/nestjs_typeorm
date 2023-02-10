import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions, SeederFactoryManager } from "typeorm-extension"
import { MainSeeder } from "./src/database/seeder/main.seeder";

const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "employees",
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

export const AppDataSource = new DataSource(options)
