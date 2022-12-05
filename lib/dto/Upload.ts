import { Field, InputType } from 'type-graphql';

@InputType()
export class SecureUploadInput {
    @Field(() => String)
    mimetype: string;

    @Field(() => String)
    extension: string;

    @Field(() => String, { defaultValue: '', nullable: true })
    prefix: string = '';
}
