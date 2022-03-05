import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";


@Injectable()
export class UserService {

    constructor(
        private userRepository: UserRepository
    ) {}

    async signup(data: any): Promise<any> {
        const user = await this.userRepository.createUser(data)
        return user
    }

}    