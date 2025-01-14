import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useFetchUserProfile from "@/hooks/useFetchUserProfile";
import {
	BookMarkedIcon,
	DiscAlbumIcon,
	Grid,
	Heart,
	HeartIcon,
	MessageCircleIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const activeTab = "text-black border-t-2 border-slate-400 rounded-none";

function Profile() {
	const { id } = useParams();
	useFetchUserProfile(id);
	const { profile } = useSelector((state) => state.profile);
	const [selectedTab, setSelectedTab] = useState("posts");
	const { user } = useSelector((state) => state.auth);
	return (
		<div className="w-full lg:w-2/3 mx-auto">
			<div className="px-4 pt-14 flex flex-col gap-8">
				<div className="flex gap-8 items-center">
					<Avatar className="w-36 h-36 m-4">
						<AvatarImage src={profile?.profilePic} />
						<AvatarFallback className="bg-slate-200 text-xl">
							{profile?.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-6">
						<div className="flex items-center gap-4">
							<h1 className="text-xl">{profile?.username}</h1>
							<Button variant="outline" className="bg-slate-200">
								Edit Profile
							</Button>
							{user?._id !== id && (
								<Button
									variant="outline"
									className="bg-slate-200"
								>
									Follow
								</Button>
							)}
							<button>
								<Button
									variant="outline"
									className="bg-slate-200"
								>
									More
								</Button>
							</button>
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
