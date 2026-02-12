export interface signUpResponse {
    username: string,
    email: string,
    role: string
}

export interface signUpRequest {
    username: string,
    email: string,
    password: string
}

export interface loginResponse{
    login: boolean,
    accessToken: string,
    refreshToken: string
}

export interface loginRequest{
    username: string,
    password: string
}

export interface refreshResponse{
    accessToken: string,
    refreshToken: string
}