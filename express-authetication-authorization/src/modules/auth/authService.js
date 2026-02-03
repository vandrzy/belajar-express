import AppError from '../../utils/appError.js';
import {createUser, getUserByEmail} from '../user/userRepository.js';
import bcrypt from 'bcrypt';
import { generateToken } from './jwtService.js';

const SALT_ROUNDS = 10;

export const register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const data = {username, email, password: hashedPassword};

    const user = await createUser(data)

    console.log(user);

    return {
        username: user.username,
        email: user.email
    };
}

export const login = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) throw new AppError('Email atau password salah', 401);
    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!passwordValidation) throw new AppError('Email atau password salah', 401);

    const token = generateToken(user.role, user.username, user.email);

    return {
        login: true,
        token
    };
}