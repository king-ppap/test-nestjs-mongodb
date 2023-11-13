import { IsEmail, IsString } from 'class-validator';

class UserJwtDto {
    @IsString()
    sub: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;
}

export { UserJwtDto };
