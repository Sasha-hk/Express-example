import TokenModel from '../models/TokenModel.js'
import jwt from 'jsonwebtoken'


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'})

        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const existingToken = await TokenModel.findOne({user: userId})
        if (existingToken) {
            existingToken.refreshToken = refreshToken
            return existingToken.save()
        }

        const newToken = await TokenModel.create({
            user: userId,
            refreshToken
        })

        return newToken
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        }
        catch (e) {
            return null
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        }
        catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        try {
            const token = await TokenModel.findOne({refreshToken})
            return token
        }
        catch (e) {
            return null
        }
    }

    async findRefreshToken(refreshToken) {
        try {
            const token = await TokenModel.findOne({refreshToken})
            return token
        }
        catch (e) {
            return null
        }
    }
}


export default new TokenService()
