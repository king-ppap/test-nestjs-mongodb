import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
    @prop({ index: true, required: true, unique: true })
    public id: number;

    @prop({ lowercase: true, required: true, unique: true })
    public username: string;

    @prop({ required: true, unique: true })
    public firstname: string;

    @prop({ required: true, unique: true })
    public lastname: string;

    @prop({ required: true })
    public password: string;
}

export const UserModel = getModelForClass(User);
