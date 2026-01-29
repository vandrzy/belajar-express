import z from "zod";


export const createRoleRequest = z.object({
    name: z.string()
});