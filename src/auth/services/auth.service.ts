import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { ISafeUser } from "src/user/interfaces/user.interface";
import { RefreshTokenRepository } from "../repository/refreshToken.repository";
import { pick } from 'lodash'
import { UserService } from "src/user/services/user.service";
import { ILogin } from "../interfaces/auth.interface";


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RefreshTokenRepository) 
        private refreshTokenRepository: RefreshTokenRepository,
        private userService: UserService
    ) {}

    async login(data: ILogin): Promise<ISafeUser> {
        const { email, password } = data
        const user = await this.userService.findOne({email})
        const validate = await this.userService.validateLoginCredentials(user, password)
        if(!validate) throw new UnauthorizedException("Invalid Login Credentials")
        return pick(user, ["id", "username", "email", "firstname", "surname"])
    }
}    