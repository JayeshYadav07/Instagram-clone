import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LucideLogOut, LucideSettings } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function RightSidebar() {
	const { user, suggestedUsers } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const shortBio = (bio, length) => {
		if (!bio) return "bio ...";

		if (bio.length > length) {
			return bio.slice(0, length) + "...";
		}
		return bio;
	};
	return (
		<div className="hidden xl:block xl:w-1/3 bg-white px-8 py-6 shadow">
			<div className="flex items-center gap-4">
				<Avatar className="h-10 w-10 bg-slate-200">
					<AvatarImage src={user.profilePic} />
					<AvatarFallback className="text-lg">
						{user.username[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div
					className="flex flex-col cursor-pointer"
					onClick={() => navigate(`/profile/${user._id}`)}
				>
					<span className="font-semibold">{user.username}</span>
					<span className="text-xs text-gray-400">
						{shortBio(user.bio, 60)}
					</span>
				</div>
			</div>
			<div className="mt-8 flex flex-col gap-4	">
				<div className="flex items-center justify-between">
					<h1>Suggested for you</h1>
					<Button size="sm" variant="ghost">
						See all
					</Button>
				</div>
				<div className="flex flex-col gap-4">
					{suggestedUsers.slice(0, 3).map((user) => (
						<div className="flex items-center gap-4" key={user._id}>
							<Avatar className="h-10 w-10 bg-slate-200">
								<AvatarImage src={user?.profilePic} />
								<AvatarFallback className="text-lg">
									{user?.username[0].toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div
								className="flex flex-col cursor-pointer"
								onClick={() => navigate(`/profile/${user._id}`)}
							>
								<span className="font-semibold">
									{user?.username}
								</span>
								<span className="text-xs text-gray-400">
									{shortBio(user?.bio, 30)}
								</span>
							</div>
							<Button
								size="sm"
								variant="ghost"
								className="ml-auto text-blue-500"
							>
								Follow
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default RightSidebar;
