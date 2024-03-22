import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../../env.js"
interface ThunkApiConfig {
    rejectWithValue: any;
}

export const createTempOrderFunc = createAsyncThunk('order/creteTempOrder', async (_, thunkApiConfig: ThunkApiConfig) => {

    const { rejectWithValue } = thunkApiConfig;
    try {
        const response = await axios.post(`${apiUrl}/createOrder/tempOrder`)
        return response.data;
    } catch (error) {
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        return rejectWithValue(errorMessage);
    }
});

export const createOrderFunc = createAsyncThunk('order/creteOrder', async (tempId, thunkApiConfig: ThunkApiConfig) => {
    const { rejectWithValue } = thunkApiConfig;
    try {
        const response = await axios.post(`${apiUrl}/createOrder/order`, { tempId })
        return response.data;
    } catch (error) {
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        return rejectWithValue(errorMessage);
    }
});

export const getOrdersFunc = createAsyncThunk('order/getOrdersFunc', async (_, thunkApiConfig: ThunkApiConfig) => {
    const { rejectWithValue } = thunkApiConfig;
    try {
        const response = await axios.get(`${apiUrl}/createOrder/order`,)
        console.log('response::: ', response);
        return response.data;
    } catch (error) {
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        return rejectWithValue(errorMessage);
    }
});



const initialState: any = {
    orders: [],
    loading: false,
    error: null,
    status: 'idle',
};

const orderReducer = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToCart: (state, action: any) => {
            state.categories.push(action.payload);
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createOrderFunc.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderFunc.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload?.data;
            })
            .addCase(createOrderFunc.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })

    },
});

export const {

} = orderReducer.actions;

export default orderReducer.reducer;