import axios from "axios";
import SidebarItem from "./SidebarItem";
import sidebarItem from "@/utils/sidebarItems";
import { API_URL, TOAST_OPTION } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

function LeftSidebar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			const response = await axios.get(`${API_URL}/user/logout`, {
				withCredentials: true,
			});

			if (response.data.success) {
				dispatch(setAuthUser(null));
				toast.success(response.data.message, TOAST_OPTION);
				navigate("/login");
			} else {
				toast.error(response.data.message, TOAST_OPTION);
			}
		} catch (error) {
			toast.error(
				error.response.data.message || error.message,
				TOAST_OPTION
			);
		}
	};
	const handleClick = (title) => {
		if (title === "Logout") {
			return handleLogout();
		} else {
			navigate(`/${title.toLowerCase()}`);
		}
	};
	return (
		<div className="hidden md:block md:w-1/4 lg:w-1/5 xl:w-1/6 bg-white p-4 shadow">
			<div>
				<h1
					className="text-2xl font-normal p-2 cursor-pointer mb-4"
					onClick={() => navigate("/")}
				>
					Instagram
				</h1>
			</div>
			<div className="flex flex-col gap-4">
				{sidebarItem.map((item) => {
					return (
						<SidebarItem
							onClick={() => handleClick(item.title)}
							key={item.id}
							{...item}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default LeftSidebar;
