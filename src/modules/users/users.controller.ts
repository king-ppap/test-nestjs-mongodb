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
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    private logger = new Logger(UsersController.name);

    @Post()
    @Version('1')
    async create(@Body() createUser: User) {
        createUser.password = await bcrypt.hash(createUser.password, 10);
        this.logger.debug(createUser);
        return this.usersService
            .create(createUser)
            .then((res) => {
                const data = res.toObject();
                delete data.password;
                return data;
            })
            .catch((error) => {
                if (error.code === 11000) {
                    throw new ConflictException('Username already exists');
                } else {
                    throw new BadRequestException(error.message);
                }
            });
    }

    @Get()
    @Version('1')
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Version('1')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @Version('1')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService
            .update(id, updateUserDto)
            .then((res) => {
                const data = res.toObject();
                delete data.password;
                return data;
            })
            .catch((error) => {
                if (error.code === 11000) {
                    throw new ConflictException('Username already exists');
                } else {
                    throw new BadRequestException(error.message);
                }
            });
    }

    @Delete(':id')
    @Version('1')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
