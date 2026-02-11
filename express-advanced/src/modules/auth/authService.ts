import { getUserByUsername, createUser } from "../user/userRepository";
import { signUpResponse } from "./authDto";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10
export const signUp = async (username: string, email: string, password: string) : Promise<signUpResponse> => {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const data = {
        username, email, password: passwordHash 
    };
    const user = await createUser(data);

    return {
        username: user.username,
        email: user.email,
        role: user.role
    }
}