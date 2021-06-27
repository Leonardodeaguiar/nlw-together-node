import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
    email: string;
    password: string;
}

export class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new Error("Email/Password doesn't exist");
        }

        const match = await compare(password, user.password);

        if (!match) {
            throw new Error("Email/Password doesn't exist");
        }

        const token = sign(
            {
                email: user.email,
            },
            "25c8d92d26abf687f96fab5288388047",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return token;
    }
}