import DataLoader from 'dataloader';
import User from '../models/user';
import db from './connection';

const dataloaders = {
    userDataloader: new DataLoader<number, User, unknown>(async (ids) => {
        const users = await db('users')
            .select([
                'user_id',
                'username',
                'email',
                'first_name',
                'last_name',
                'phone',
                'role',
                'created_at',
                'updated_at',
            ])
            .whereIn('user_id', ids);
        return ids.map((id) => users.find((row: any) => row.user_id === id));
    })
};

export default dataloaders;
