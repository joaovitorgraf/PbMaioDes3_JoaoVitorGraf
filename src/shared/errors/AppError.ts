class StandardError {
    public readonly message: string;
    public readonly error: string;
    public readonly statusCode: number;

    constructor(message: string, error = 'Bad Request', statusCode = 400) {
        this.message = message;
        this.error = error;
        this.statusCode = statusCode;
    }
}

class ValidationError {
    public readonly type: string;
    public readonly resource: string;
    public readonly message: string;
    public readonly statusCode: number;

    constructor(type: string, resource: string, message: string, statusCode = 400) {
        this.type = type;
        this.resource = resource;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export { ValidationError, StandardError };
