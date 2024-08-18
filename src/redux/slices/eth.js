import { createSlice } from "@reduxjs/toolkit";

const ethSlice = createSlice({
    name: "ethSlice",
    initialState: [],
    reducers: {
        addWallet: (state, action) => {
            state.push(action.payload);
            return state;
        },
    }
})

export const { addWallet } = ethSlice.actions;

export default ethSlice.reducer;