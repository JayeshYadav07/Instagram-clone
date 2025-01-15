import { setChatUsers } from "@/redux/authSlice";
import { API_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchChatUser = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchChatUser = async () => {
			try {
				const response = await axios.get(`${API_URL}/user/chat-users`, {
					withCredentials: true,
				});
				if (response?.data?.success) {
					dispatch(setChatUsers(response.data.data));
				} else {
					console.log(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchChatUser();
	}, []);
	return null;
};

export default useFetchChatUser;
