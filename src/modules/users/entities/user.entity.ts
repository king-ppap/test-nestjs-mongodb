import { Country } from '@modules/country/entities/country.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Ref, prop } from '@typegoose/typegoose';
import { IsDefined, IsOptional } from 'class-validator';

export class User {
    @ApiProperty()
    @IsDefined()
    @prop({ index: true, lowercase: true, required: true, unique: true })
    public username: string;

    @ApiProperty()
    @IsDefined()
    @prop({ required: true })
    public password: string;

    @ApiProperty()
    @IsDefined()
    @prop({ required: true })
    public firstname: string;

    @ApiProperty()
    @IsDefined()
    @prop({ required: true })
    public lastname: string;

    @ApiProperty()
    @IsOptional()
    @prop({ required: false, default: null })
    public email?: string;

    @ApiProperty({ type: 'string' })
    @IsDefined()
    @prop({ ref: () => Country })
    public country: Ref<Country>;
}
