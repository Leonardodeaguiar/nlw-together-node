import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    //verificar se é admin
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "25c8d92d26abf687f96fab5288388047") as IPayload;
        request.user_id = sub;
        return next();
    } catch (err) {
        return response.status(401).end();
    }

}