import { AuthChecker } from 'type-graphql';
import { MyContext } from '../types/types';
import { verify } from 'jsonwebtoken';
import { AuthenticationError, ApolloError } from 'apollo-server';

class InvalidTokenError extends ApolloError {
    constructor() {
        super('Invalid token');
    }
}

const extractJwtToken = (req: any) => {
    try {
        if (!req.headers || !req.headers.authorization) {
            throw new AuthenticationError('Unauthorized');
        }

        const parts = req.headers.authorization.split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                return credentials;
            } else {
                throw new InvalidTokenError();
            }
        }
    } catch (e) {
        throw e;
    }
};

export const authChecker: AuthChecker<MyContext, string> = async ({ context }, roles) => {
    const {
        req,
        dataloaders: { userDataloader },
    } = <MyContext>context;

    try {
        const token = extractJwtToken(req);

        const {
            data: { id },
        }: any = verify(token, process.env.JWT_SECRET_KEY as string);
        const user = await userDataloader.load(id);

        if (!user) {
            throw new AuthenticationError('User not found');
        }

        context.user = user;

        if (roles && roles.length > 0 && !roles.map((r) => r.toLowerCase()).includes(user.role)) {
            throw new AuthenticationError('User does not have the required role to access the resource.');
        }

        return true;
    } catch (e) {
        if (roles.includes('ANONYMOUS')) {
            return true;
        }
        throw e;
    }
};
