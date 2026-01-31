import z from "zod";


export const createUserRequestBody = z.object({
    name: z.string(),
    email: z.string().email('Format email tidak valid'),
    age: z.coerce.number('umur harus berupa angka').int().min(0)
});

export const updateUserRequestBody = z.object({
    name: z.string().optional(),
    email: z.string().email('Format email tidak valid').optional(),
    age: z.coerce.number('umur harus berupa angka').int().min(0).optional()
}).refine(data => Object.keys(data).length > 0, {message: 'Tidak ada data yang dikirim'});