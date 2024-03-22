import { configureStore } from "@reduxjs/toolkit";
import categories from '../redux/slices/categorySlice';
import cartReducer from '../redux/slices/cartSclice';
import orderReducer from '../redux/slices/orderSlices';
import utilReducer from '../redux/slices/utilSlice';


export const store = configureStore({
    reducer: {
        categories,
        cartReducer,
        orderReducer,
        utilReducer,
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

