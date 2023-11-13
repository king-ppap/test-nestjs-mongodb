import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
    UseGuards,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@ApiTags('Country')
@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    private logger = new Logger(CountryController.name);

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Version('1')
    async create(@Body() country: Country) {
        return this.countryService.create(country).catch((error) => {
            if (error.code === 11000) {
                throw new ConflictException('Country already exists');
            } else {
                throw new BadRequestException(error.message);
            }
        });
    }

    @Get()
    @Version('1')
    findAll() {
        return this.countryService.findAll();
    }

    @Get(':id')
    @Version('1')
    findOne(@Param('id') id: string) {
        return this.countryService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Version('1')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateCountryDto) {
        return this.countryService.update(id, updateUserDto).catch((error) => {
            if (error.code === 11000) {
                throw new ConflictException('Country already exists');
            } else {
                throw new BadRequestException(error.message);
            }
        });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Version('1')
    remove(@Param('id') id: string) {
        return this.countryService.remove(id);
    }
}
