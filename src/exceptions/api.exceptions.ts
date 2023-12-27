import { ValidationError } from "express-validator";

class ApiException extends Error {
    public status: number;
    public errors: Error[] | ValidationError[];

    constructor(status: number, msg: string, errors: Error[] | ValidationError[] = []) {
        super(msg);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiException(401, 'User is not unauthorized');
    }

    static BadRequest(msg: string, errors: Error[] | ValidationError[] = []) {
        return new ApiException(400, msg, errors);
    }
}

export default ApiException;