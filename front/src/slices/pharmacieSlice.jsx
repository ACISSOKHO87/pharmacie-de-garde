import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pharmacies: []
}

export const pharmacieSlice = createSlice({
    name: "pharmacie",
    initialState,
    
    reducers: {
        loadPharmacies: (state, action) => {
            state.pharmacies = action.payload
        }
    }
})

export const { loadPharmacies } = pharmacieSlice.actions
export const selectPharmacies = state => state.pharmacie
export default pharmacieSlice.reducer