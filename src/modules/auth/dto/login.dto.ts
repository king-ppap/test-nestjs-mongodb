import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class LoginDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export { LoginDto };
