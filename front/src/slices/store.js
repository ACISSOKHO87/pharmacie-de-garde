import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"
import pharmacieReducer from "../slices/pharmacieSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        pharmacie: pharmacieReducer
    }
})

export default store;