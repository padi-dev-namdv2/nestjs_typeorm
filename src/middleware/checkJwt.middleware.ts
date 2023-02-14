import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["x-api-key"];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).json({
            success: false,
            code: 401,
            message: "Phiên đăng nhập hết hạn!"
        });
        return;
    }

    const { id, name, email } = jwtPayload;
    const newToken = jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    res.setHeader("x-api-key", newToken);

    next();
};