export interface ISafeUser{
    id?: string
    username: string
    email: string
    firstname: string
    surname: string
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