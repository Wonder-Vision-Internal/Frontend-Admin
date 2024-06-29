import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./Slice";

export const Store = configureStore({
    reducer:{
        wonderadmin:adminReducer
    }
})