import { Field, ObjectType } from 'type-graphql';
import Region from './region';

@ObjectType()
export class Country {
    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;

    @Field(() => [Region])
    regions: Array<Region>;
}

export default Country;
