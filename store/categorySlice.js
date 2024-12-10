import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://6459b1e995624ceb21edb04a.mockapi.io/api/tranchibao/category';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});
export const addCategory = createAsyncThunk('categories/add', async (category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/update', async (category) => {
  const response = await axios.put(`${API_URL}/${category.id}`, category);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
  
const categorySlice = createSlice({
  name: 'categories',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }) 
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;

