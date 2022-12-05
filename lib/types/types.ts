import DataLoader from 'dataloader';
import { Knex } from 'knex';
import User from '../models/user';
import AuthRepository from '../repositories/AuthRepository';
import ProductRepository from '../repositories/ProductRepository';
import UserRepository from '../repositories/UserRepository';

export type MyContext = {
    req: any;
    res: any;
    db: Knex;
    user: User | null;
    dataloaders: {
        userDataloader: DataLoader<number, User, unknown>;
    };
    repositories: {
        userRepository: UserRepository;
        authRepository: AuthRepository;
        productRepository: ProductRepository;
    };
};

export interface IObject {
    [key: string]: any;
}
