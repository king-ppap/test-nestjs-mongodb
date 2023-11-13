import { LogLevel } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsString, ValidateNested } from 'class-validator';
import { JwtConfig } from '../config/jwt.config';
import { ApiDocConfig } from './apidoc.config';
import { CorsConfig } from './cors.config';
import { DatabaseBaseConfig } from './database/base.database.config';

type NodeEnv = 'development' | 'production' | 'staging';

export class RootConfig {
    public readonly NODE_ENV: NodeEnv = <NodeEnv>process.env.NODE_ENV;

    @IsNumber()
    public readonly PORT: number = 3000;

    @IsString()
    public readonly LOG_LEVEL: LogLevel = 'error';

    @Type(() => ApiDocConfig)
    @ValidateNested()
    @IsDefined()
    public readonly API_DOC: ApiDocConfig;

    @Type(() => JwtConfig)
    @ValidateNested()
    @IsDefined()
    public readonly JWT: JwtConfig;

    @Type(() => CorsConfig)
    @ValidateNested()
    @IsDefined()
    public readonly CORS: CorsConfig;

    @Type(() => DatabaseBaseConfig)
    @ValidateNested()
    @IsDefined()
    public readonly DATABASE_BASE: DatabaseBaseConfig;
}
