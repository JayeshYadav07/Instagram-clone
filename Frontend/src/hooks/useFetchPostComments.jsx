import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setPostComments } from "../redux/postSlice";
import { API_URL } from "../utils/constant";
const useFetchPostComments = (id, open) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchPostComments = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/post/comments/${id}`,
					{
						withCredentials: true,
					}
				);
				if (response?.data?.success) {
					dispatch(setPostComments(response.data.data));
				} else {
					console.log(response);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (open === true) {
			fetchPostComments();
		}
	}, [open]);
};

export default useFetchPostComments;
