import User from '../models/user';
import BaseRepository from './BaseRepository';


class UserRepository extends BaseRepository {
    async load(user_id: number): Promise<User> {
        let user = await this.db('users').where({ user_id }).first();

        return user;
    }
}

export default UserRepository;
