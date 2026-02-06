import RefreshToken from "./refreshTokenModel.js";

export const saveRefreshToken = async (data) => {
    return await RefreshToken.create(data);
};

export const findRefreshToken = async (token) => {
    return await RefreshToken.findOne({
        tokenHash: token,
        revokeAt: null
    })
}

export const usedToken = async (token) => {
    return await RefreshToken.updateOne(
        {tokenHash: token},
        {revokeAt: new Date()}
    );
};