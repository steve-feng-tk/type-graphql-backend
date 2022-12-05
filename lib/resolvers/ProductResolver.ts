import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import Product from '../models/product';
import { MyContext } from '../types/types';

@Resolver((_of) => Product)
export class ProductResolver {
    @Query(() => Product)
    @Authorized()
    async products(@Ctx() ctx: MyContext) {
        const {
            user,
            repositories: { productRepository },
        } = ctx;

        if (user) {
            return productRepository.load();
        }

        return null;
    }
}
