module.exports = class AuthenticationError extends Error {
    status 
    error
    message 

    constructor(status, message, errors = []) {
        super(message)
        this.message = message
        this.status = status 
        this.error = errors
    }

    static EmailExists() {
        return new AuthenticationError(400, 'User with this email already exists')
    }

    static EmailDoesNotExists() {
        return new AuthenticationError(400, 'User with this email does not exists')
    }

    static InvalidPassword() {
        return new AuthenticationError(400, 'Password is incorrect')
    }

    static NoRefreshToken() {
        return new AuthenticationError(400, 'No refresh token')
    }

    static RefreshTokenInvalid() {
        return new AuthenticationError(400, 'Refresh token is invalid')
    }

    static AuthorizedError() {
        return new AuthenticationError(400, 'User is not authenticated')
    }

    static BadRequest(message = "", errors = []) {
        return new AuthenticationError(400, message, errors);
    }
}