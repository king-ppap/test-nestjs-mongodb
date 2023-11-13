import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

class UserJwtDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;
}

export { UserJwtDto };
