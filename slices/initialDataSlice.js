import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businessLogic: [],
    ingredients: []
};

export const selectStatus = (state) => state.initialData.status;

export const initialDataSlice = createSlice({
    name: "initialData",
    initialState,
    reducers: {
        fillBusinessLogic: (state, action) => {
            state.businessLogic = action.payload;
        },
        fillIngredients: (state, action) => {
            state.ingredients = action.payload;
        },
    },
});

export const { fillBusinessLogic, fillIngredients } = initialDataSlice.actions;

export default initialDataSlice.reducer;