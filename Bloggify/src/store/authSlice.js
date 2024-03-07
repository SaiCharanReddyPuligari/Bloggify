import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {  //reducers contains different action, i.e functions
      login: (state, action)=>{
          state.status = true;
          state.userData = action.payload.userData
      },
      logout: (state)=>{
        state.status = false;
        userData: null;
      }
    }
})

export const {login, logout}= authSlice.actions;

export default authSlice;