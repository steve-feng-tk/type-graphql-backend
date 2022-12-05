import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { SecureUploadInput } from '../dto/Upload';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../utils/amazon';

@ObjectType()
export class SecureFile {
    constructor(url: string, view_url: string) {
        this.url = url;
        this.view_url = view_url;
    }

    @Field(() => String)
    url: string;

    @Field(() => String)
    view_url: string;
}

@Resolver((_of) => SecureFile)
export class UploadResolver {
    @Query(() => SecureFile)
    async uploadUrl(@Arg('input') input: SecureUploadInput) {
        const Key = `${input.prefix}/${uuidv4()}.${input.extension}`;

        const url = s3.getSignedUrl('putObject', {
            Bucket: process.env.AWS_BUCKET ?? 'snobswap2',
            Expires: 1800,
            Key,
            ContentType: input.mimetype,
        });

        const view_url = s3.getSignedUrl('getObject', {
            Bucket: process.env.AWS_BUCKET ?? 'snobswap2',
            Expires: 1800,
            Key,
        });

        return new SecureFile(url, view_url);
    }
}
