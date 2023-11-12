import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RootConfig } from '@config/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [RootConfig],
      useFactory: (config: RootConfig) => ({
        secret: config.JWT.ACCESS_TOKEN_SECRET,
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
