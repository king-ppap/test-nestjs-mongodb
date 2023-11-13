import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Version('1')
    create(@Body() createUser: User) {
        return this.usersService.create(createUser);
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
