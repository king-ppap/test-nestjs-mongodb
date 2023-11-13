import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsDefined } from 'class-validator';

export class Country {
    @ApiProperty()
    @IsDefined()
    @prop({ index: true, lowercase: true, required: true, unique: true })
    public code: string;

    @ApiProperty()
    @IsDefined()
    @prop({ required: true })
    public name: string;
}
