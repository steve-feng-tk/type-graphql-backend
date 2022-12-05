import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import User from '../models/user';
import { MyContext } from '../types/types';

@Resolver((_of) => User)
export class UserResolver {
    @Query(() => User)
    @Authorized()
    async me(@Ctx() ctx: MyContext) {
        const {
            user,
            repositories: { userRepository },
        } = ctx;

        if (user) {
            return userRepository.load(user.user_id);
        }

        return null;
    }
}
