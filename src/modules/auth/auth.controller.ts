import { BadRequestException, Body, Controller, Logger, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    private logger = new Logger(AuthController.name);

    @Post('login')
    @Version('1')
    async login(@Body() loginRequest: LoginDto) {
        this.logger.debug(loginRequest);
        return this.authService.signIn(loginRequest.username, loginRequest.password).catch((error) => {
            if (error.code === 11000) {
            } else {
                throw new BadRequestException(error.message);
            }
        });
    }
}
