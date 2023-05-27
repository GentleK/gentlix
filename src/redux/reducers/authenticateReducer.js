import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    id: "",
    name: "",
    grade: 0,
    authenticate: false
}

const authenticateSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.data.id;
            state.name = action.payload.data.name;
            state.grade = action.payload.data.grade;
            state.authenticate = true;
        },
        logoutUser(state) {
            state.id = '';
            state.name = '';
            state.grade = 0;
            state.authenticate = false;
        }
    }
})

export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;