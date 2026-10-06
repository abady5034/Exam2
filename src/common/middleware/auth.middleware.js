import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";
import { BadRequestException } from "../Exception/error.Exception.js";

export const auth = (req, res, next) => {
    let token = req.headers.authorization;
    let decodedData = jwt.verify(token, env.secretKeyAccess);
    if (decodedData) {
        req.user = decodedData;
        next();
    } else return BadRequestException({ message: "Invalid Token" });
};
