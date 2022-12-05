import db from '../db/connection';
import AuthRepository from './AuthRepository';
import UserRepository from './UserRepository';

export default {
    userRepository: new UserRepository(db),
    authRepository: new AuthRepository(db),
};
