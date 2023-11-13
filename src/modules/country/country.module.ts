import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';

@Module({
    imports: [TypegooseModule.forFeature([Country])],
    controllers: [CountryController],
    providers: [CountryService],
    exports: [],
})
export class CountryModule {}
