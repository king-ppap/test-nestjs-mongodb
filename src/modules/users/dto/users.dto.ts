import { IsBooleanString, IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UserJwtDto {
    @ApiProperty()
    @IsNumberString()
    username: number;

    @ApiProperty()
    @IsEmail()
    email: string;
}

export { UserJwtDto };
