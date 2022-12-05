import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { LoginPayload, LoginResponse } from '../dto/Auth';
import User from '../models/user';
import { MyContext } from '../types/types';

@Resolver((_of) => User)
export class AuthResolver {
    @Mutation(() => LoginResponse)
    async login(@Arg('input') input: LoginPayload, @Ctx() ctx: MyContext) {
        const {
            repositories: { authRepository },
        } = ctx;
        console.log(input)
        return authRepository.login(input);
    }
}
