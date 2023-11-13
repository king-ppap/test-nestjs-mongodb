import { Module } from '@nestjs/common';
import { databaseProviders } from './base.database.providers';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
