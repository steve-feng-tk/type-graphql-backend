import { Field, InputType, Int } from "type-graphql";
import { StandardConnectionArgs } from "../utils/relay";

@InputType()
export class WishlistFilterArgs extends StandardConnectionArgs {
    @Field(() => Int, { nullable: true })
    user_id: number;
}