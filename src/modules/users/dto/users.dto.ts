import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString } from 'class-validator';

class UserJwtDto {
    @ApiProperty()
    @IsNumberString()
    username: number;

    @ApiProperty()
    @IsEmail()
    email: string;
}

export { UserJwtDto };
