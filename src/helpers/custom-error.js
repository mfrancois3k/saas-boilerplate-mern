// extend error with custom status code

class CustomError extends Error {
    constructor(message, status) {
        super(message); 
        this.status = status;
    }
}

export default CustomError
