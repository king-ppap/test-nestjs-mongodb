import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsDefined } from 'class-validator';

export class User {
    @ApiProperty()
    @IsDefined()
    @prop({ lowercase: true, required: true, unique: true })
    public username: string;

    @ApiProperty()
    @IsDefined()
    @prop({ required: true, unique: true })
    public firstname: string;

    @ApiProperty()
    @IsDefined()
    @prop({ required: true, unique: true })
    public lastname: string;

    @ApiProperty()
    @IsDefined()
    @prop({ required: true })
    public password: string;
}
