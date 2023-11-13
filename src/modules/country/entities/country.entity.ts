import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsDefined } from 'class-validator';

export class Country {
    @ApiProperty()
    @IsDefined()
    @prop({ index: true, uppercase: true, required: true, unique: true })
    public code: string;
}
