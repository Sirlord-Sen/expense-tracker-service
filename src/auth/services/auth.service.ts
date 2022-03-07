import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { ILoginPayload, ISafeUser } from "src/user/interfaces/user.interface";
import { RefreshTokenRepository } from "../repository/refreshToken.repository";
import { pick } from 'lodash'
import { UserService } from "src/user/services/user.service";
import { ILogin } from "../interfaces/auth.interface";
import { TokenService } from "./token.service";


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RefreshTokenRepository) 
        private refreshTokenRepository: RefreshTokenRepository,
        private userService: UserService,
        private tokenService: TokenService
    ) {}

    async login(data: ILogin): Promise<ILoginPayload> {
        const { email, password } = data
        const foundUser = await this.userService.findOne({email})
        const validate = await this.userService.validateLoginCredentials(foundUser, password)
        if(!validate) throw new UnauthorizedException("Invalid Login Credentials")
        const user = pick(foundUser, ["id", "username", "email", "firstname", "surname"])
        const balance = foundUser.balance
        return {user, balance}
    }

    async logout(id:string): Promise<void>{
        await this.tokenService.update({ userId : id } , {isRevoked: true });
    }
}    