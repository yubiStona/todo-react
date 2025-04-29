import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface AuthState{
    token:string | null;
}

const initialState:AuthState={
    token:localStorage.getItem("token"),
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,action:PayloadAction<string>)=>{
            state.token=action.payload;
            localStorage.setItem("token",action.payload);
           
        },
        logout:(state)=>{
            localStorage.removeItem("token");
            state.token=null;
        }
    }
})

export const {setToken,logout}=authSlice.actions;
export default authSlice.reducer;