import jwt, { JwtPayload } from 'jsonwebtoken'

interface RefreshTokenPayload extends JwtPayload{
    username: string
};
interface AccessTokenPayload extends JwtPayload{
    username: string,
    password: string
};

export const generateAccessToken = (username: string, role: string) =>{
    const payload = {username, role};
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        'expiresIn': '1h'
    });
}

export const validateAccessToken = (token: string): AccessTokenPayload => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as AccessTokenPayload;
}

export const generateRefreshToken = (username: string) => {
    const payload = {username};
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
        'expiresIn': '8h'
    });
}

export const validateRefreshToken = (token: string): RefreshTokenPayload => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as RefreshTokenPayload
}