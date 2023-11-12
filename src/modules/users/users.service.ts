import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './entities/user.entity';

@Injectable()
export class UsersService {
    create(createUserDto: CreateUserDto) {
        return UserModel.create(createUserDto);
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return UserModel.findOne({ id });
    }

    findOneWithUsername(username: string) {
        return UserModel.findOne({ username });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
