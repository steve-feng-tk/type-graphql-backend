import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Country {
    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;
}

export default Country;
