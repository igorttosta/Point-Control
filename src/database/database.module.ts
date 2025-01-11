import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Hour } from 'src/entities/hour.entity'
import { User } from 'src/entities/user.entity'
import { DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'pg',
    entities: [User, Hour],
    synchronize: false, 
}

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return {
                    ... dataSourceOptions,
                }
            },
        }),
    ],
})
export class DatabaseModule {}
