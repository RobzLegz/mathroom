import { createSlice } from "@reduxjs/toolkit";
import { pageText, supportedLanguages } from "../../utils/languages";

interface State{
    text: object;
    language: string;
}

const initialState: State = {
    text: pageText.latvian,
    language: "LV",
}

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            if(supportedLanguages.some((l) => l.short === action.payload) && state.language !== action.payload){
                if(action.payload === "LV"){
                    state.text = pageText.latvian;
                }
            }
        },
    },
});

export const { 
    changeLanguage,
} = languageSlice.actions;

export const selectlanguages = (state: any) => state.language;

export default languageSlice.reducer;