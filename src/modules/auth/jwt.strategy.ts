import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConfig } from '@config/jwt.config';
import { UserJwtDto } from '../users/dto/users.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: JwtConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: UserJwtDto) {
        return payload;
    }
}
