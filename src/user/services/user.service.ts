import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../entity/user.entity";
import { IUser } from "../interfaces/user.interface";
import { UserRepository } from "../repository/user.repository";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
    ) {}

    async signup(data: any): Promise<any> {
        const user = await this.userRepository.createUser(data)
        return user
    }

    async findOne(query: Partial<IUser>): Promise<User>{
        try{ return await this.userRepository.findOneOrFail({ where: query });}
        catch(err){ throw new NotFoundException(`User not with ${query} not found`) }
    }
}    