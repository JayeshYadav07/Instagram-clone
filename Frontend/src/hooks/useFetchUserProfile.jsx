import { setProfile } from "@/redux/profileSlice";
import { API_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchUserProfile = (id) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/user/profile/${id}`,
					{
						withCredentials: true,
					}
				);
				if (response?.data?.success) {
					dispatch(setProfile(response.data.data));
				} else {
					console.log(response);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserProfile();
	}, [id]);
	return null;
};

export default useFetchUserProfile;
