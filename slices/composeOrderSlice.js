import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    size: "small",
    ingredients: [],
};

export const composeOrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.ingredients.push({
                id: action.payload,
                numOfServings: 1,
            });
        },
        deleteItem: (state, action) => {
            state.ingredients = [
                ...state.ingredients.filter(
                    (item) => item.id !== action.payload
                ),
            ];
        },
        sortItems: (state, action) => {
            state.ingredients = action.payload;
        },
        clearOrder: () => initialState,
        setSaladName: (state, action) => {
            state.name = action.payload;
        },
        setSaladSize: (state, action) => {
            state.size = action.payload;
        },
        setNumOfServings: (state, action) => {
            state.ingredients.find(
                (item) => item.id === action.payload.id
            ).numOfServings = action.payload.numOfServings;
        },
    },
});

export const {
    addItem,
    deleteItem,
    sortItems,
    clearOrder,
    setSaladName,
    setSaladSize,
    setNumOfServings,
} = composeOrderSlice.actions;

export default composeOrderSlice.reducer;
