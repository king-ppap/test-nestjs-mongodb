import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username, password) {
        const user = await this.usersService.findOneWithUsername(username);
        const result = await bcrypt.compare(password, user?.password);
        if (!result) {
            throw new UnauthorizedException();
        }
        const payload = {
            sub: user.id,
            username: user.username,
        };
        return {
            access_token: await this.jwtService.signAsync(payload, { expiresIn: '1d' }),
        };
    }
}
