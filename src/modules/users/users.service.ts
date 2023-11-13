import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: ReturnModelType<typeof User>,
    ) {}

    create(createUserDto: User) {
        return this.userModel.create(createUserDto);
    }

    findAll() {
        return this.userModel.find();
    }

    findOne(_id: string) {
        return this.userModel.findOne({ _id });
    }

    findOneWithUsername(username: string) {
        return this.userModel.findOne({ username });
    }

    update(_id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findOneAndUpdate({ _id }, updateUserDto);
    }

    remove(_id: string): any {
        return this.userModel.deleteOne({ _id });
    }
}
