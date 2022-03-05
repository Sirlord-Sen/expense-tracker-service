import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../entity/user.entity";
import { ICreateUser, ISafeUser, IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repository/user.repository";
import { pick } from 'lodash'
import { ILogin } from "src/auth/interfaces/auth.interface";
import { verify } from 'argon2'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository,
    ) {}

    async signup(data: ICreateUser): Promise<ISafeUser> {
        const user = await this.userRepository.createUser(data)
        return pick(user, ["id", "username", "email", "firstname", "surname"])
    }

    async findOne(query: Partial<IUser>): Promise<User>{
        try{ return await this.userRepository.findOneOrFail({ where: query });}
        catch(err){ throw new NotFoundException(`User not with ${query} not found`) }
    }

    async findCurrentUser(data: Partial<IUser>): Promise<ISafeUser>{
        const user = await this.findOne(data)
        return pick(user, ["id", "username", "email", "firstname", "surname"])
    }

    async validateLoginCredentials(user: Pick<ILogin, 'password'>, password: string):Promise<Boolean>{
        try{return await verify(user.password, password)}
        catch(err){throw new InternalServerErrorException("Could not verify Password")}
    }
}    