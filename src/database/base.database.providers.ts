import { DatabaseBaseConfig } from '@config/database/base.database.config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        inject: [DatabaseBaseConfig],
        provide: 'DATABASE_CONNECTION',
        useFactory: (config: DatabaseBaseConfig): Promise<typeof mongoose> => {
            const uri = config.uri;
            return mongoose.connect(uri);
        },
    },
];
