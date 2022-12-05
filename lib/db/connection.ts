import Knex from 'knex';
import config from './knexfile';

const knex = Knex(config);
// knex.on('query', function (queryData) {
//     console.log(queryData);
// });
export default knex;
