import {createSlice} from '@reduxjs/toolkit'


const profileSlice = createSlice({
    name:'Profile',
    initialState :{
        data:null
    },
    reducers:{
        setProfile : (state,action)=>{
            state.data = action.payload
        },
        editProfile :(state,action)=>{
            state.data = {...state.data,...action.payload}
        },
        deleteProfile : (state)=>{
            state.data = null
        },
        logout: (state) => {
            state.data = null; 
            localStorage.removeItem("token"); 
            localStorage.removeItem("userId"); 
          },
    }
})


export const {setProfile,editProfile,deleteProfile,logout} = profileSlice.actions
export default profileSlice.reducer