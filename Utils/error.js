
/**
 * CustomError Class
 * A specialized error class for creating custom error messages with enhanced clarity and debugging.
 * @extends Error
 */
export class CustomError extends Error {
    /**
     * Creates a new CustomError instance.
     * @param {string} message - The error message to associate with this error.
     */
    constructor(message) {
        super(message);
        this.name = "CustomError"; // Set the name to differentiate it from standard errors
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError); // Captures the stack trace for debugging
        }
    }
}