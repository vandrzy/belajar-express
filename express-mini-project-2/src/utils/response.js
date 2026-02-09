export const successResponse = (message, data = null) => {
    return {
        success: true,
        timestamps: new Date().toISOString(),
        message,
        data
    }
}

export const failedResponse = (message, error=null) => {
    return{
        success: false,
        timestamps: new Date().toISOString(),
        message,
        error
    }
}