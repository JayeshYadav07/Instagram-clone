import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useFetchUserProfile from "@/hooks/useFetchUserProfile";
import { followUser, unfollowUser } from "@/redux/profileSlice";
import { API_URL, TOAST_OPTION } from "@/utils/constant";
import axios from "axios";
import {
	BookMarkedIcon,
	DiscAlbumIcon,
	Grid,
	HeartIcon,
	MessageCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const activeTab = "text-black border-t-2 border-slate-400 rounded-none";

function Profile() {
	const { id } = useParams();
	useFetchUserProfile(id);
	const dispatch = useDispatch();
	const { profile } = useSelector((state) => state.profile);
	const { user } = useSelector((state) => state.auth);
	const [selectedTab, setSelectedTab] = useState("posts");
	const [isFollowed, setIsFollowed] = useState(
		profile.followers.includes(user._id)
	);

	const handleFollow = async () => {
		try {
			const response = await axios.post(
				`${API_URL}/user/follow-user/${id}`,
				{},
				{ withCredentials: true }
			);
			if (response.data.success) {
				setIsFollowed(true);
				dispatch(followUser(id));
				toast.success(response.data.message, TOAST_OPTION);
			} else {
				console.log(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnfollow = async () => {
		try {
			const response = await axios.post(
				`${API_URL}/user/unfollow-user/${id}`,
				{},
				{ withCredentials: true }
			);
			if (response.data.success) {
				setIsFollowed(false);
				dispatch(unfollowUser(id));
				toast.success(response.data.message, TOAST_OPTION);
			} else {
				console.log(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="w-full lg:w-2/3 mx-auto">
			<div className="px-4 pt-14 flex flex-col gap-8">
				<div className="flex gap-8 items-center">
					<Avatar className="w-36 h-36 m-4 border border-slate-200">
						<AvatarImage src={profile?.profilePic} />
						<AvatarFallback className="text-lg">
							{profile?.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-6 max-w-lg">
						<div className="flex items-center gap-4 justify-between">
							<h1 className="text-xl font-semibold mr-4 ">
								{profile?.username}
							</h1>
							<div className="flex gap-2">
								{user?._id === id && (
									<Button variant="outline">
										Edit Profile
									</Button>
								)}
								{user?._id !== id && isFollowed === false && (
									<Button
										variant="outline"
										className="bg-blue-400 text-white"
										onClick={handleFollow}
									>
										Follow
									</Button>
								)}
								{user?._id !== id && isFollowed === true && (
									<Button
										variant="outline"
										className="bg-slate-400 text-white"
										onClick={handleUnfollow}
									>
										Unfollow
									</Button>
								)}
								<Button variant="outline">More</Button>
							</div>
						</div>
						<div className="flex gap-4">
							<span>
								<span className="font-semibold mr-1">
									{profile?.posts.length}
								</span>
								posts
							</span>
							<span>
								<span className="font-semibold mr-1">
									{profile?.followers.length}
								</span>
								followers
							</span>
							<span>
								<span className="font-semibold mr-1">
									{profile?.following.length}
								</span>
								following
							</span>
						</div>
						<span>
							<Badge
								variant="outline"
								className="mt-2 border-slate-700 text-sm"
							>
								@{profile?.username.toLowerCase()}
							</Badge>
						</span>
						<p className="text-md text-gray-700">{profile?.bio}</p>
					</div>
				</div>
				<div>
					<hr className="border border-gray-300" />
					<div className="flex gap-4 justify-center text-slate-700">
						<Button
							variant="ghost"
							onClick={() => setSelectedTab("posts")}
							className={selectedTab === "posts" && activeTab}
						>
							<Grid className="mr-1" />
							<span>POSTS</span>
						</Button>
						<Button
							variant="ghost"
							onClick={() => setSelectedTab("reels")}
							className={selectedTab === "reels" && activeTab}
						>
							<DiscAlbumIcon />
							<span>REELS</span>
						</Button>
						{user?._id === id && (
							<Button
								variant="ghost"
								onClick={() => setSelectedTab("saved")}
								className={selectedTab === "saved" && activeTab}
							>
								<BookMarkedIcon />
								<span>SAVED</span>
							</Button>
						)}
					</div>
					<div className="mt-4 w-[95%] mx-auto">
						{selectedTab === "posts" && (
							<div className="grid grid-cols-3 gap-4">
								{profile?.posts?.map((post) => (
									<div key={post._id} className="relative">
										<img
											src={post.post_url}
											alt="post-img"
											className="w-full h-80   object-cover rounded-sm border border-gray-300"
										/>
										<div className="flex z-10 absolute top-0 left-0 h-full w-full justify-center items-center gap-4 opacity-0 bg-slate-700 text-white cursor-pointer hover:bg-opacity-45 hover:opacity-100">
											<span className="flex items-center gap-1">
												{post.likes.length}
												<HeartIcon fill="white" />
											</span>
											<span className="flex items-center gap-1">
												{post.comments.length}
												<MessageCircleIcon fill="white" />
											</span>
										</div>
									</div>
								)) || (
									<p className="text-center mt-4">
										No posts found
									</p>
								)}
							</div>
						)}
						{selectedTab === "reels" && (
							<p className="text-center mt-4">No reels found</p>
						)}
						{selectedTab === "saved" && (
							<div className="grid grid-cols-3 gap-4">
								{profile?.bookmarks?.map((post) => (
									<div key={post._id} className="relative">
										<img
											src={post.post_url}
											alt="post-img"
											className="w-full h-80 object-cover rounded-sm border border-gray-300"
										/>
										<div className="flex z-10 absolute top-0 left-0 h-full w-full justify-center items-center gap-4 opacity-0 bg-slate-700 text-white cursor-pointer hover:bg-opacity-45 hover:opacity-100">
											<span className="flex items-center gap-1">
												{post.likes.length}
												<HeartIcon fill="white" />
											</span>
											<span className="flex items-center gap-1">
												{post.comments.length}
												<MessageCircleIcon fill="white" />
											</span>
										</div>
									</div>
								)) || (
									<p className="text-center mt-4">
										No saved posts found
									</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
