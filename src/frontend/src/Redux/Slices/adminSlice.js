import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isAuthenticated: false,
        users: [],
    },
    reducers: {
        loginAdmin: (state) => {
            state.isAuthenticated = true;
        },
        logoutAdmin: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem("adminToken");
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        // editUser: (state, action) => {
        //     console.log("🚀 Reducer Called with:", action.payload);
        //     state.users = state.users.map((user) =>
        //         user._id === action.payload._id ? action.payload : user
        //     );
        //     console.log("🛠 Updated Redux State:", state.users);
        // },
        
        editUser: (state, action) => {
            console.log("Reducer Called with:", action.payload._id);
            state.users = state.users.map((user) =>
                user._id === action.payload._id ? action.payload : user
            );
        
            console.log("🛠 Updated Redux State:", state.users);
        },
        
        
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload);
        },
    },
});

export const { loginAdmin, logoutAdmin, setUsers, addUser, editUser, deleteUser } = adminSlice.actions;
export default adminSlice.reducer;
