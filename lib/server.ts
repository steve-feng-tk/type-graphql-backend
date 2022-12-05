import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import 'dotenv/config';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import db from './db/connection';
import dataloaders from './db/dataloaders';
import { authChecker } from './middlewares/authChecker';
import repositories from './repositories';
import { AuthResolver } from './resolvers/AuthResolver';
import { UploadResolver } from './resolvers/UploadResolver';
import { UserResolver } from './resolvers/UserResolver';

const defaultContext = async ({ req, res }: any) => {
    return {
        req,
        res,
        db,
        dataloaders,
        repositories,
    };
};

export const createServer = async () => {
    const schema = await buildSchema({
        resolvers: [AuthResolver, UserResolver, UploadResolver],
        emitSchemaFile: true,
        authChecker,
    });

    return new ApolloServer({
        schema,
        context: defaultContext,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    });
};

export default createServer;
