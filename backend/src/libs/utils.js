export function ResponseError(res, statusCode, message) {
    return res.status(statusCode).json({
        success: false,
        message
    });
}

export function ResponseSuccess(res, statusCode, data) {
    return res.status(statusCode).json({
        success: true,
        data
    });
}