import { RootConfig } from '@config/config';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [RootConfig],
            useFactory: (config: RootConfig) => ({
                secret: config.JWT.ACCESS_TOKEN_SECRET,
            }),
        }),
        UsersModule,
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
