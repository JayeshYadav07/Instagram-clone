import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
	},
	reducers: {
		setAuthUser: (state, action) => {
			state.user = action.payload;
		},
		addBookmark: (state, action) => {
			state.user.bookmarks.push(action.payload);
		},
		removeBookmark: (state, action) => {
			state.user.bookmarks = state.user.bookmarks.filter(
				(id) => id !== action.payload
			);
		},
	},
});

export const { setAuthUser, addBookmark, removeBookmark } = authSlice.actions;
export default authSlice.reducer;
