import createServer from './server';

const main = async () => {
    const server = await createServer();
    server
        .listen({
            port: 4444,
        })
        .then(({ port }) => {
            console.log(`🚀 Server ready and listening at ==> http://localhost:${port}${server.graphqlPath}`);
        });
};
main();
