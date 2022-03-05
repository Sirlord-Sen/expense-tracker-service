import { Injectable } from "@nestjs/common";


@Injectable()
export class AuthService {

    constructor(
    ) {}

    async login(user: Omit<any, 'fullname'>): Promise<any> {
        
    }
}    