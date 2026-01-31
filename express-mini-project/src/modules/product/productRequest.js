import z from "zod";

export const createProductRequestBody = z.object({
    name: z.string(),
    description: z.string(),
    userId: z.string()
});

export const updateProductRequestBody = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
});

export const userIdRequestQuery = z.object({
    u: z.string()
});

export const paginationRequestQuery = z.object({
    sortBy: z.enum(['name']).optional().default('name'),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
    limit: z.coerce.number('Limit harus angka').int().min(1).max(100).optional().default(10),
    offset: z.coerce.number('Offset harus angka').int().min(0).optional().default(0)
});