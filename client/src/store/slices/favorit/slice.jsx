import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a favorite
export const createFavorite = createAsyncThunk("favoritslice/createFavorite", async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/favorit//createFavorite", data);
    return response.data; // Assuming the response contains the created favorite
  } catch (error) {
    throw error;
  }
});

// Async thunk for deleting a favorite by token
export const deleteFavoriteByToken = createAsyncThunk("favoritslice/deleteFavoriteByToken", async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/favorit//deleteFavoriteByToken", data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk for getting favorites by token
export const getFavoritesByToken = createAsyncThunk("favoritslice/getFavoritesByToken", async (data) => {
  try {
    const response = await axios.delete("http://localhost:8000/favorit//getFavoritesByToken", data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk for updating a favorite by token
export const updateFavoriteByToken = createAsyncThunk("favoritslice/updateFavoriteByToken", async (data) => {
  try {
    const response = await axios.put("http://localhost:8000/favorit//updateFavoriteByToken", data); // Assuming there is a typo here; it should probably be axios.put
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Create a slice for the favoritslice state
const favoritslice = createSlice({
  name: "favoritslice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFavorite.fulfilled, (state, action) => {
        // Handle success state after creating a favorite
        // action.payload contains the data returned from the async thunk
      })
      .addCase(deleteFavoriteByToken.fulfilled, (state, action) => {
        // Handle success state after deleting a favorite by token
      })
      .addCase(getFavoritesByToken.fulfilled, (state, action) => {
        // Handle success state after getting favorites by token
      })
      .addCase(updateFavoriteByToken.fulfilled, (state, action) => {
        // Handle success state after updating a favorite by token
      });
  },
});

export default favoritslice.reducer;
