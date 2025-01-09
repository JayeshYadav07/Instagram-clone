import { useEffect, useReducer } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constant";
import { setPost } from "@/redux/postSlice";
import { useDispatch } from "react-redux";
const useFetchPosts = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchAllPosts = async () => {
			try {
				const response = await axios.get(`${API_URL}/post/all`, {
					withCredentials: true,
				});
				if (response?.data?.success) {
					dispatch(setPost(response.data.data));
				} else {
					console.log(response);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllPosts();
	}, []);
};

export default useFetchPosts;
