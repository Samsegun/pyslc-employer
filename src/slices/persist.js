import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    prevPath: "",
};

export const persistSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setPrevPath: (state, { payload }) => {
            state.prevPath = payload;
        },
    },
});

export const persistSelector = state => state.persist;

// Action creators are generated for each case reducer function
export const { setUser, setPrevPath } = persistSlice.actions;

export default persistSlice.reducer;
