import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		suggestedUsers: [],
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
		setSuggestedUsers: (state, action) => {
			state.suggestedUsers = action.payload;
		},
	},
});

export const { setAuthUser, addBookmark, removeBookmark, setSuggestedUsers } =
	authSlice.actions;
export default authSlice.reducer;
