import jwt from 'jsonwebtoken';

export const generateAccessToken = (email, username, role) => {
    const payload = {email, username, role};
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'});
}

export const validateAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export const generateRefreshToken = (email) => {
    return jwt.sign({email}, process.env.JWT_REFRESH_SECRET, { expiresIn: '8h'});
}

export const validateRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}