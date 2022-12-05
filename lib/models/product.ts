import moment from 'moment-timezone';
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

    @Field(() => String)
    shipDate(): string {
        const orderedDate = moment(this.created_at)
        let shipDate = orderedDate.add(this.maxBusinessDaysToShip - 1, 'days')
        if (!this.shipOnWeekends && shipDate.day() >= 5) {
            shipDate = shipDate.add(7 - shipDate.day(), 'days')
        }
        return shipDate.format('LL')
    }

    @Field(() => String)
    orderedDate(): string {
        return moment(this.created_at).format('LL')
    }

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}

export default Product;
