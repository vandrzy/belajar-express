import RefreshToken from "./refreshTokenModel.js";

export const createRefreshToken = async (userId, tokenHash, expiredAt) => {
    return await RefreshToken.create({userId, tokenHash, expiredAt})
}

export const findTokenByHash = async (tokenHash) => {
    return await RefreshToken.findOne({tokenHash});
}

export const usedToken = async (tokenHash) => {
    return await RefreshToken.updateOne({tokenHash}, {revokedAt: new Date()});
}