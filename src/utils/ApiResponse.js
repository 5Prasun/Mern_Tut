class ApiResponse{
    constructor(statusCode, message = "Success", data) {
        this.statusCode = statusCode; // HTTP status code
        this.message = message; // Response message
        this.data = data;
        this.success = statusCode < 400; // Optional data payload
    }
}