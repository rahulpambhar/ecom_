import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../../env"
import { CategoriesState } from "../../../../types/global";


const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
    status: 'idle',
};
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
        const page = 1
        const limit = 100
        const response = await axios.get(`${apiUrl}/admin/category?page=${page}&limit=${limit}`)
        // const response = await axios.get(`${process.env.API_URL}/admin/category?page=${page}&limit=${limit}`)
        return response.data;
    } catch (error) {
        throw error;
    }
});



const categoriesReducer = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategories: (state, action: any) => {
            state.categories.push(action.payload);
        },
        // updateCategories: (state: any, action) => {
        //     const index = state.categories.findIndex(
        //         (user) => user.category_name === action.payload?.category_name
        //     );
        //     if (index !== -1) {
        //         state.categories[index] = action.payload.updatedUser;
        //     }
        // },
        // deleteCategories: (state, action) => {
        //     state.categories = state.categories.filter(
        //         (user) => user.category_name !== action.payload
        //     );
        // },
        // deleteAllCategories: (state) => {
        //     state.categories = [];
        // },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload?.data;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    },
});

export const {
    addCategories,
    // updateCategories,
    // deleteCategories,
    // deleteAllCategories,
} = categoriesReducer.actions;

export default categoriesReducer.reducer;


