import { IsDefined } from 'class-validator';

export class JwtConfig {
    @IsDefined()
    public readonly ACCESS_TOKEN_SECRET: string;
}
