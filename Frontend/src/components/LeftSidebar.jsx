import { setAuthUser } from "@/redux/authSlice";
import { API_URL, TOAST_OPTION } from "@/utils/constant";
import axios from "axios";
import {
	Compass,
	LogOut,
	LucideHome,
	MessageCircle,
	Plus,
	Search,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import SidebarItem from "./SidebarItem";
import CreatePost from "./CreatePost";
import { useState } from "react";

function LeftSidebar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const [openCreatePost, setOpenCreatePost] = useState(false);

	const sidebarItem = [
		{
			id: crypto.randomUUID(),
			title: "Home",
			icon: <LucideHome />,
		},
		{
			id: crypto.randomUUID(),
			title: "Search",
			icon: <Search />,
		},
		{
			id: crypto.randomUUID(),
			title: "Explore",
			icon: <Compass />,
		},
		{
			id: crypto.randomUUID(),
			title: "Messages",
			icon: <MessageCircle />,
		},
		{
			id: crypto.randomUUID(),
			title: "Create",
			icon: <Plus />,
		},
		{
			id: crypto.randomUUID(),
			title: "Profile",
			icon: (
				<Avatar className="h-7 w-7">
					<AvatarImage src={user?.profilePic} />
					<AvatarFallback className="bg-slate-200 text-lg">
						{user?.username.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			),
		},
		{
			id: crypto.randomUUID(),
			title: "Logout",
			icon: <LogOut />,
		},
	];
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
		} else if (title === "Create") {
			setOpenCreatePost(true);
		} else if (title === "Profile") {
			navigate(`/profile/${user._id}`);
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
			<CreatePost open={openCreatePost} setOpen={setOpenCreatePost} />
		</div>
	);
}

export default LeftSidebar;
