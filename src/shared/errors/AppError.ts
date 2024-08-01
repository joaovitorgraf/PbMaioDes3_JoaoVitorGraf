class AppError {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly error: string;

    constructor(message: string, error = 'Bad Request', statusCode = 400) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}

export default AppError;
