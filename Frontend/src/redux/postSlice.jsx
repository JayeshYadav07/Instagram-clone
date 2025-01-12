import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "post",
	initialState: {
		posts: [],
		comments: [],
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
		setPostComments: (state, action) => {
			state.comments = action.payload;
		},
	},
});
export const { setPost, addPost, resetPost, setPostComments } =
	postSlice.actions;
export default postSlice.reducer;
