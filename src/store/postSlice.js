import { createSlice } from "@reduxjs/toolkit";

const initialState={
      slug: '',
}

const postSlice=createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPost: (state, action) => {
            return { ...state, ...action.payload }; // Store full post data
        }

    }

})

export const {getPost} =postSlice.actions;

export default postSlice.reducer;