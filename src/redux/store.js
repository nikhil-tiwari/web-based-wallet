import { configureStore } from "@reduxjs/toolkit";
import ethReducer from "./slices/eth";
import solReducer from "./slices/sol";

export const store = configureStore({
    reducer: {
        ethWallets: ethReducer,
        solWallets: solReducer,
    }
})