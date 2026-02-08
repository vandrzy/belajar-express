import jwt from 'jsonwebtoken';


export const generateToken = (role, username, email) => {
    const payload = {username, email, role};

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};


export const generateRefreshToken = (id) => {
    const payload = {userId: id};
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '1h'
    });
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};