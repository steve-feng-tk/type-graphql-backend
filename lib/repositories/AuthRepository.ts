import sendgrid from '@sendgrid/mail';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { LoginPayload, LoginResponse } from '../dto/Auth';
import User from '../models/user';
import hash from '../utils/hash';
import BaseRepository from './BaseRepository';
sendgrid.setApiKey(process.env.SENDGRID_KEY as string);

export const generateToken = (user: User, expiresIn: string | number | undefined = '7d') => {
    const token = jwt.sign(
        {
            data: {
                id: user.user_id,
            },
        },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn }, // 7 days
    );
    return token;
};

class AuthRepository extends BaseRepository {
    async login(input: LoginPayload): Promise<LoginResponse> {
        console.log(input)
        const user = await this.db('users')
            .select([
                'user_id',
                'role',
                'password',
                'username',
                'email',
                'first_name',
                'last_name',
                'created_at',
                'updated_at',
            ])
            .where('email', input.email)
            .first();
        console.log(user)
        if (!user) {
            throw new GraphQLError('Invalid credentials');
        }

        const isPasswordValid = await hash.check(`${user.password}`, input.password);
        delete user.password;

        if (!isPasswordValid) {
            throw new GraphQLError('Invalid credentials');
        }

        // Update last accessed date
        await this.db('users')
            .where('user_id', user.user_id)
            .update({
                last_access: this.db.raw('NOW()'),
            });

        const token = generateToken(user);

        return { token, user };
    }
}

export default AuthRepository;
