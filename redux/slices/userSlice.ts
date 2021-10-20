import { createSlice } from "@reduxjs/toolkit";

interface User{
    name: string;
    email: string;
    role: string;
    root: boolean;
    avatar: string;
}

interface Product{
    _id: string;
    user: string;
    image: string;
    name: boolean;
    price: number;
    stock: number;
    store: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    productionTime: number;
}

interface Order{
    _id: string;
    reciever: string;
    store: string;
    total: number;
    user: string;
    createdAt: string;
    updatedAt: string;
    products: Product[];
}

interface State{
    loggedIn: boolean;
    token: string;
    info: null | User;
    order: null | Order;
}

const initialState: State = {
    loggedIn: false,
    token: "",
    info: null,
    order: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        setUserInfo: (state, action) => {
            state.info = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
    },
});

export const { 
    login,
    setUserInfo,
    setToken,
    setOrder,
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;