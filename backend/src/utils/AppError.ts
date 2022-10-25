class AppError extends Error {
    statusCode: number
    status: string
    isOperational: boolean
    msg: string
    constructor(message: string, statusCode: number) {
        super(message)
        this.msg = message
        this.statusCode = statusCode
        this.status = String(this.statusCode).startsWith(
            '4'
        )
            ? 'Fail'
            : 'Error'
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}
export default AppError
