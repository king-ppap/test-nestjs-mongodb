import { PartialType } from '@nestjs/swagger';
import { Country } from '../entities/country.entity';

export class UpdateCountryDto extends PartialType(Country) {}
