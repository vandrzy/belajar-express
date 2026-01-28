import z from "zod";

export const createPostRequestBody = z.object({
    title: z.string(),
    description: z.string({
        required_error: "Name wajib diisi",
        invalid_type_error: "Name harus berupa string",
    })
})


export const updatePostRequestBody = z.object({
    title: z.string().optional(),
    description: z.string().optional()
}).refine(data => Object.keys(data).length > 0, {message: "Tidak ada data yang dikirim"})

