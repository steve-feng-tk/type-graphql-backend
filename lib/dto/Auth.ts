import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import User from '../models/user';

@InputType()
export class LoginPayload {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;
}

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    token: string;

    @Field(() => User)
    user: User;
}
