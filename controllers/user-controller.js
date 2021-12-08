import UserService from '../services/user-service.js'
import AuthenticationError from '../exceptions/AuthenticationError.js';


class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body 

            const userData = await UserService.registration(email, password) 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000})
            res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async logIn(req, res, next) {
        try {
            const {email, password} = req.body 
            const userData = await UserService.logIn(email, password)
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000})
            res.json(userData) 
        }
        catch (e) {
            next(e)
        }
    }

    async logOut(req, res, next) {
        try {
            const {refreshToken} = req.cookies 
            const token = await UserService.logOut(refreshToken)
            res.clearCookie('refreshToken');
            return res.json(token);
        }
        catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies

            
            if (!refreshToken) {
                throw AuthenticationError.NoRefreshToken()
            }
            
            const userData = await UserService.refresh(refreshToken)
            
            if (!userData) {
                throw AuthenticationError.BadRequest()
            }

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000})
            res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }
}


export default new UserController()
