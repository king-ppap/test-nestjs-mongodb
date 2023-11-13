import { Logger, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { CountryModule } from '@modules/country/country.module';
import { UsersModule } from '@modules/users/users.module';
import { fileLoader, TypedConfigModule } from 'nest-typed-config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from '../modules/auth/auth.module';
import { RootConfig } from './config/config';

@Module({
    imports: [
        TypedConfigModule.forRoot({
            schema: RootConfig,
            load: fileLoader({
                transform: (c) => {
                    new Logger('TypedConfigModule').debug(c);
                    return c;
                },
            }),
        }),
        LoggerModule.forRootAsync({
            inject: [RootConfig],
            useFactory: async (config: RootConfig) => {
                return {
                    pinoHttp: {
                        level: config.LOG_LEVEL,
                        genReqId: (req) => req.headers['x-correlation-id'],
                    },
                };
            },
        }),
        TypegooseModule.forRootAsync({
            inject: [RootConfig],
            useFactory: async (config: RootConfig) => {
                return {
                    uri: config.DATABASE_BASE.uri,
                };
            },
        }),
        AuthModule,
        CountryModule,
        UsersModule,
    ],
})
export class AppModule {}
