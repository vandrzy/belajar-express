import User, {UserInterface} from "./userModel";

export const getUserByUsername = async (username: string): Promise<UserInterface | null> => {
    return await User.findOne({username});
}

// data = {username, email, password}
export const createUser = async (data: {username: string, email: string, password:string}): Promise<UserInterface> => {
    return await User.create(data)
}