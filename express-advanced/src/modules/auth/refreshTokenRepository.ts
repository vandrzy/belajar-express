import RefreshToken from "./refreshTokenModel";
import { Types } from "mongoose";

export const createRefreshToken = async (data: {tokenHash:string, userId: Types.ObjectId, expiredAt: Date}) => {
    return await RefreshToken.create(data);
};

export const getRefreshTokenByHash = async (tokenHash: string) => {
    return await RefreshToken.findOne({tokenHash});
};