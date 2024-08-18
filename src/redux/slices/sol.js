import { createSlice } from "@reduxjs/toolkit";

const solSlice = createSlice({
    name: "solSlice",
    initialState: [],
    reducers: {
        addWallet: (state, action) => {
            state.push(action.payload);
            return state;
        },
    }
})

export const { addWallet } = solSlice.actions;

export default solSlice.reducer;