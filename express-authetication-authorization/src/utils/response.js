export const successResponse = (message, data = null) => {
    return {
        success: true,
        timestamps: new Date().toISOString(),
        message: message,
        data: data
    }
}

export const failedResponse = (message, error = null) => {
    return {
        success: false,
        timestamps: new Date().toISOString(),
        message: message,
        error
    }
}