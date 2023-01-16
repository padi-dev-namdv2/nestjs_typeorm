import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "nestjs_learn",
    synchronize: false,
    logging: false,
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: [
        "src/database/migration/**/*.ts"
    ],
    subscribers: [],
    cache: true
})
