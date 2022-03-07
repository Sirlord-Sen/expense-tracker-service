import { Balance } from "src/expense/entity/balance.entity"

export interface ISafeUser{
    id?: string
    username: string
    email: string
    firstname: string
    surname: string
}

export interface ILoginPayload{
    user: ISafeUser,
    balance: Balance
}

export interface IUser{
    id?: string
    username?: string
    email?: string
    firstname?: string
    surname?: string
    password?:string
    created_at?: Date
    updated_at?: Date
}

export interface ICreateUser{
    username?: string
    email?: string
    firstname?: string
    surname?: string
    password?:string
}