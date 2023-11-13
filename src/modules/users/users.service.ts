import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: ReturnModelType<typeof User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        return this.userModel.create(createUserDto);
    }

    findAll() {
        return this.userModel.find();
    }

    findOne(id: number) {
        return this.userModel.findOne({ id });
    }

    findOneWithUsername(username: string) {
        return this.userModel.findOne({ username });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
