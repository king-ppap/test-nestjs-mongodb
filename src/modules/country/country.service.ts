import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country)
        private readonly model: ReturnModelType<typeof Country>,
    ) {}

    create(data: Country) {
        return this.model.create(data);
    }

    findAll() {
        return this.model.find();
    }

    findOne(_id: string) {
        return this.model.findOne({ _id });
    }

    update(_id: string, updateUserDto: UpdateCountryDto) {
        return this.model.findOneAndUpdate({ _id }, updateUserDto);
    }

    remove(_id: string): any {
        return this.model.deleteOne({ _id });
    }
}
