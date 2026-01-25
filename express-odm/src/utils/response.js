
export const failedResponse = (message, error=null) => {
    return {
        sucsess: false,
        message,
        error
    }
}

export const successResponse = (message, data=null) => {
    return {
        success: true,
        message,
        data
    }
}