export interface IUserCredentials {
    email: string,
    password: string
}

export interface IRegisterUser {
    name: string,
    email: string,
    password: string
}

export interface ILoggedUser {
    id: string,
    name: string,
    roles: string[]
}