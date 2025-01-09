import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "post",
	initialState: {
		posts: [],
	},
	reducers: {
		setPost: (state, action) => {
			state.posts = action.payload;
		},
		addPost: (state, action) => {
			state.posts.push(action.payload);
		},
		resetPost: (state, action) => {
			state.posts = [];
		},
	},
});
export const { setPost, addPost, resetPost } = postSlice.actions;
export default postSlice.reducer;
