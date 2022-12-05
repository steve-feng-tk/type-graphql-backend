import { Field, ID, InputType, Int, ObjectType, registerEnumType } from 'type-graphql';

export enum UserPermission {
    LOGIN_ENABLED = 0x0000000000000001,
}
registerEnumType(UserPermission, { name: 'UserPermission' });

export const UserPermissionsText: Record<string, string> = {
    [UserPermission.LOGIN_ENABLED]: 'LOGIN_ENABLED',
};

@InputType()
export class PermissionInput {
    @Field(() => Int)
    user_id: number;

    @Field(() => [UserPermission])
    permissions: [UserPermission];
}


@ObjectType()
export class AccountSource {
    @Field(() => ID, { name: 'id' })
    source_id: number;
}


@ObjectType()
class User {
    @Field(() => ID, { name: 'user_id' })
    user_id: number;

    @Field(() => String, { nullable: true })
    first_name: string;

    @Field(() => String, { nullable: true })
    last_name: string;

    @Field(() => String)
    role: string;

    @Field(() => String, { nullable: true })
    phone: string;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => String)
    email: string;

    @Field(() => String)
    username: string;
}

export default User;
