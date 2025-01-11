import {
	BookmarkIcon,
	Heart,
	MessageCircle,
	MoreHorizontal,
	Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";
import CommentDialogBox from "./CommentDialogBox";

function Post({ post }) {
	const [text, setText] = useState("");
	const [open, setOpen] = useState(false);
	return (
		<div className="mx-auto max-w-sm border-b-2 border-gray-400 py-2 my-2 text-sm">
			<div className="flex justify-between items-center mb-2">
				<div className="flex gap-2 items-center">
					<Avatar className="h-10 w-10">
						<AvatarImage src={post.author.profilePic} />
						<AvatarFallback className="bg-white text-lg">
							{post.author.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<span className="font-semibold">
						{post.author.username}
					</span>
				</div>
				<Dialog>
					<DialogTrigger>
						<MoreHorizontal />
					</DialogTrigger>
					<DialogContent className="flex flex-col text-sm text-center max-w-sm">
						<Button variant="ghost">Unfollow</Button>
						<Button variant="ghost">Add to favorites</Button>
						<Button variant="ghost">Delete</Button>
					</DialogContent>
				</Dialog>
			</div>
			<img
				className="w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-sm object-contain bg-white"
				src={post.post_url}
				alt="img"
			/>
			<div className="flex justify-between items-center my-2">
				<div className="flex gap-3 items-center">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Heart className="cursor-pointer hover:text-gray-500" />
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Like</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<MessageCircle
									className="cursor-pointer hover:text-gray-500"
									onClick={() => setOpen(true)}
								/>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Comment</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Send className="cursor-pointer hover:text-gray-500" />
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Send</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<BookmarkIcon className="cursor-pointer hover:text-gray-500" />
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>Bookmark</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			{post.likes.length > 0 && (
				<span className="font-semibold">{post.likes.length} likes</span>
			)}
			{post.caption && (
				<div className="my-2">
					<span className="font-semibold">
						{post.author.username}
					</span>{" "}
					<span>{post.caption}</span>
				</div>
			)}
			{post.comments.length > 0 && (
				<p
					className="text-sm text-gray-500 cursor-pointer"
					onClick={() => setOpen(true)}
				>
					View all {post.comments.length} comments
				</p>
			)}
			<CommentDialogBox open={open} setOpen={setOpen} post={post} />
			<div className="flex justify-between items-center gap-2">
				<input
					type="text"
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder="Add a comment..."
					className="w-full outline-none border-none bg-transparent"
				/>
				{text && (
					<span className="cursor-pointer text-blue-600">Post</span>
				)}
			</div>
		</div>
	);
}

export default Post;
