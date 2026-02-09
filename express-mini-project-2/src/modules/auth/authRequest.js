import z from 'zod';

export const registrasiRequestBody = z.object({
    username: z.string({required_error: 'Username wajib diisi'}).min(3, 'Username minimal 3 karakter').max(10, 'Username maximal 10 karakter'),
    email: z.string({required_error: 'Email wajib diisi'}).email('Email tidak valid'),
    password: z.string({required_error: 'Password wajib diisi'}).min(5, 'Password minimal 5 karakter').max(10, 'Password maximal 10 karakter')
});

export const loginRequestBody = z.object({
    email: z.string({required_error: 'Email wajib diisi'}).email('Email tidak valid'),
    password: z.string({required_error: 'Password wajib diisi'}).min(5, 'Password minimal 5 karakter').max(10, 'Password maximal 10 karakter')
});