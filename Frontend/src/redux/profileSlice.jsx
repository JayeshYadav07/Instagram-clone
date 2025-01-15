import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
	name: "profile",
	initialState: {
		profile: null,
	},
	reducers: {
		setProfile: (state, action) => {
			state.profile = action.payload;
		},
		followUser: (state, action) => {
			state.profile.followers.push(action.payload);
		},
		unfollowUser: (state, action) => {
			state.profile.followers = state.profile.followers.filter(
				(id) => id !== action.payload
			);
		},
	},
});

export const { setProfile, followUser, unfollowUser } = profileSlice.actions;
export default profileSlice.reducer;
