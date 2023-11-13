import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Param,
    Patch,
    Post,
    Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
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
                delete res.password;
                return res;
            })
            .catch((error) => {
                if (error.code === 11000) {
                    throw new ConflictException('Username already exists');
                } else {
                    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
                }
            });
    }

    @Get()
    @Version('1')
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Version('1')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @Version('1')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @Version('1')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
