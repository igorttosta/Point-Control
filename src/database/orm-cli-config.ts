import { DataSource } from "typeorm"
import { dataSourceOptions } from "./database.module"
import { CreateHourTable1736627748739 } from "src/migration/1736627748739-CreateHourTable"
import { CreateUserTable1736627722759 } from "src/migration/1736627722759-CreateUserTable"
import { CreateUserFkHourTable1736628850186 } from "src/migration/1736628850186-CreateUserFkHourTable"


export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [
        CreateHourTable1736627748739,
        CreateUserTable1736627722759,
        CreateUserFkHourTable1736628850186
    ],
})