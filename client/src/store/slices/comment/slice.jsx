import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL (replace with your actual API endpoint)
const API_BASE_URL = "http://localhost:8000/comment";
 

// Async Thunks
export const addComment = createAsyncThunk("comments/addComment", async (commentData) => {
    const response = await axios.post(`${API_BASE_URL}/addComment/`, commentData);
    return response.data;
});

export const fetchComments = createAsyncThunk("comments/fetchComments", async (artworkid) => {

    const response = await axios.post(`${API_BASE_URL}/getcomments`,{artworkid});
    return response.data;
});

export const updateComment = createAsyncThunk("comments/updateComment", async ( commentdata) => {
    const response = await axios.put(`${API_BASE_URL}/updateComment`, commentdata);
    console.log(commentdata)
    return response.data; 
});

export const removeComment = createAsyncThunk("comments/removeComment", async (commentId) => {
    await axios.delete(`${API_BASE_URL}/removeComment`,{data:{commentId}});
    return commentId;
});


// Async Thunks
export const getallcomment = createAsyncThunk("comments/addComment", async (artworkid) => {
    const response = await axios.post(`${API_BASE_URL}/comments`, artworkid);
    return response.data;
});

const commentslice = createSlice({
    initialState: { isLoading: false, comments: [] ,resMessage:""},
    name: "commentslice",
    reducers: {},
    extraReducers: (builder) => {
        // Add comment
        builder.addCase(addComment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments.push(action.payload);
        });
        builder.addCase(addComment.rejected, (state) => {
            state.isLoading = false;
            // Handle error or display a message
        });

        // Fetch comments
        builder.addCase(fetchComments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.isLoading = false;
            // Handle error or display a message
        });

        // Update comment
        builder.addCase(updateComment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateComment.fulfilled, (state, action) => {
            console.log( action.payload)

            state.isLoading = false;
            const updatedComment = action.payload.comment;
            const index = state.comments.findIndex((comment) => comment.id === updatedComment.id);
            if (index !== -1) {
                state.comments[index] = updatedComment;
            }


            console.log( state.comments)

        });
        builder.addCase(updateComment.rejected, (state) => {
            state.isLoading = false;
            // Handle error or display a message
        });

        // Remove comment
        builder.addCase(removeComment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(removeComment.fulfilled, (state, action) => {
            state.isLoading = false;
            const commentId = action.payload;
            state.comments = state.comments.filter((comment) => comment.id !== commentId);
        });
        builder.addCase(removeComment.rejected, (state) => {
            state.isLoading = false;
            // Handle error or display a message
        });
    },
});

export default commentslice.reducer;
