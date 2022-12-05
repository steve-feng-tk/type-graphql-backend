import db from '../db/connection';
import AuthRepository from './AuthRepository';
import ProductRepository from './ProductRepository';
import UserRepository from './UserRepository';

export default {
    userRepository: new UserRepository(db),
    authRepository: new AuthRepository(db),
    productRepository: new ProductRepository(db),
};
