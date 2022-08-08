import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    // prevPath: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        // setPrevPath: (state, payload) => {
        //     state.prevPath = payload;
        // },
    },
});

export const userSelector = state => state.user;
export const prevPathSelector = state => state.prevPath;

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
