import jwt from "jsonwebtoken"
import { env } from "../../config/env.service.js"

export const generateToken = (user) => {
    let accessToken = jwt.sign({ id: user._id }, env.secretKeyAccess, { expiresIn: "30min" })
    let refreshToken = jwt.sign({ id: user._id }, env.secretKeyRefresh, { expiresIn: "1y" })
    return { accessToken, refreshToken }
}

export const generateNewAccessToken = (refreshToken) => {
    let decoded = jwt.decode(refreshToken); console.log(decoded);
    let newAccessToken = jwt.sign({ id: decoded.id }, env.secretKeyAccess, { expiresIn: "30min" })
    return newAccessToken
}