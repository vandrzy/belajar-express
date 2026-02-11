export const successResponse = (message: string, data?: unknown)=> {
    return {
        message,
        data
    }
}
export const failedResponse = (message: string, error?: unknown)=> {
    return {
        message,
        error
    }
}