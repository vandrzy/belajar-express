import z from 'zod';

export const registerUserRequest = z.object({
    username: z.string(),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(3).max(8)
});

export const loginUserRequest = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(3).max(8)
})