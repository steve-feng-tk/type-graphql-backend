import express from 'express';
import { expressjwt } from 'express-jwt';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import db from '../db/connection';
import dataloaders from '../db/dataloaders';
import repositories from '../repositories';

import { ApolloServer } from 'apollo-server-lambda';
import { authChecker } from '../middlewares/authChecker';
import { AuthResolver } from '../resolvers/AuthResolver';
import { UploadResolver } from '../resolvers/UploadResolver';
import { UserResolver } from '../resolvers/UserResolver';

const path = '/graphql';

const defaultContext = async ({ express }: any) => {

    return {
        req: express.req,
        res: express.res,
        db,
        dataloaders,
        repositories,
    };
};

const createServer = async () => {
    const schema = await buildSchema({
        emitSchemaFile: false,
        resolvers: [AuthResolver, UserResolver, UploadResolver],
        authChecker,
    });

    return new ApolloServer({
        schema,
        context: defaultContext,
    });
};

exports.handler = (event: any, ctx: any, callback: any) => {
    ctx.callbackWaitsForEmptyEventLoop = false;

    return createServer()
        .then((server) =>
            server.createHandler({
                expressGetMiddlewareOptions: {
                    disableHealthCheck: true,
                    cors: true,
                },
                expressAppFromMiddleware(middleware: any) {
                    const app = express();
                    app.use(
                        path,
                        expressjwt({
                            algorithms: ['HS256'],
                            secret: process.env.JWT_SECRET_KEY as string,
                            credentialsRequired: false,
                            getToken(req: express.Request): string | undefined {
                                let authorization = req.get('authorization');
                                if (authorization !== undefined) {
                                    authorization = authorization.split(' ')[1];
                                }
                                return authorization;
                            },
                        }),
                    );
                    app.use(middleware);
                    return app;
                },
            }),
        )
        .then((handler) => handler(event, ctx, callback));
};
