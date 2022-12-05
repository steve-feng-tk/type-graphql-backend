import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Product {

    @Field(() => ID, { name: 'productId' })
    productId: number;

    @Field(() => String)
    productName: string;

    @Field(() => Int)
    inventoryQuantity: number;

    @Field(() => Int)
    shipOnWeekends: boolean;

    @Field(() => Int)
    maxBusinessDaysToShip: number;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}

export default Product;
