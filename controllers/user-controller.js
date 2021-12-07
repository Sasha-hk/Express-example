import UserService from '../services/user-service.js'


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
}


export default new UserController()
