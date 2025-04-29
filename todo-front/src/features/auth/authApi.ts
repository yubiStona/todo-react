import { apiSlice } from "../../app/apiSlice";
interface LoginCredentials{
    email:string;
    password:string;
}

interface RegisterUserData{
    email:string;
    password:string;
}
interface AuthResponse{
    token:string;
}

interface RegisterResponse {
    status: string;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation<AuthResponse,LoginCredentials>({
            query: (credentials)=>({
                url:"/auth/login",
                method:"POST",
                body:credentials
            }),
        }),
        register: builder.mutation<RegisterResponse,RegisterUserData>({
            query: (userData)=>({
                url:"/auth/register",
                method:"POST",
                body:userData
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApi