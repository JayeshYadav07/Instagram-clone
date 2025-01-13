import { setSuggestedUsers } from "@/redux/authSlice";
import { API_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchSuggestedUser = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchSuggestedUser = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/user/suggested-users`,
					{
						withCredentials: true,
					}
				);
				if (response?.data?.success) {
					dispatch(setSuggestedUsers(response.data.data));
				} else {
					console.log(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchSuggestedUser();
	}, []);
	return null;
};

export default useFetchSuggestedUser;
