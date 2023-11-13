import { Logger, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from '../modules/auth/auth.module';
import { fileLoader, TypedConfigModule } from 'nest-typed-config';
import { RootConfig } from './config/config';
import { UsersModule } from '@modules/users/users.module';

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
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
