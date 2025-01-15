import { addBookmark, removeBookmark } from "@/redux/authSlice";
import { setPost, setPostComments } from "@/redux/postSlice";
import { API_URL, TOAST_OPTION } from "@/utils/constant";
import axios from "axios";
import {
	BookmarkIcon,
	Heart,
	MessageCircle,
	MoreHorizontal,
	Send,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CommentDialogBox from "./CommentDialogBox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

function Post({ post }) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { posts, comments } = useSelector((state) => state.post);
	const [text, setText] = useState("");
	const [open, setOpen] = useState(false);

	const handleAddToBookmark = async (id) => {
		try {
			const response = await axios.post(
				`${API_URL}/post/bookmark/${id}`,
				{},
				{
					withCredentials: true,
				}
			);

			if (response.data.success) {
				if (user.bookmarks.includes(id)) {
					dispatch(removeBookmark(id));
				} else {
					dispatch(addBookmark(id));
				}
				toast.success(response.data.message, TOAST_OPTION);
			} else {
				toast.error(response.data.message, TOAST_OPTION);
			}
		} catch (error) {
			toast.error("Something went wrong", TOAST_OPTION);
		}
	};

	const handleLikeAndDislike = async (id) => {
		try {
			if (post.likes.includes(user._id)) {
				const response = await axios.post(
					`${API_URL}/post/dislike/${id}`,
					{},
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					const updatedPosts = posts.map((post) => {
						if (post._id === id) {
							return {
								...post,
								likes: post.likes.filter(
									(like) => like !== user._id
								),
							};
						}
						return post;
					});
					dispatch(setPost(updatedPosts));
					toast.success(response.data.message, TOAST_OPTION);
				} else {
					toast.error(response.data.message, TOAST_OPTION);
				}
			} else {
				const response = await axios.post(
					`${API_URL}/post/like/${id}`,
					{},
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					const updatedPosts = posts.map((post) => {
						if (post._id === id) {
							return {
								...post,
								likes: [...post.likes, user._id],
							};
						}
						return post;
					});
					dispatch(setPost(updatedPosts));
					toast.success(response.data.message, TOAST_OPTION);
				} else {
					toast.error(response.data.message, TOAST_OPTION);
				}
			}
		} catch (error) {
			toast.error("Something went wrong", TOAST_OPTION);
		}
	};
	const deletePost = async (id) => {
		try {
			const response = await axios.delete(
				`${API_URL}/post/delete/${id}`,
				{
					withCredentials: true,
				}
			);

			if (response.data.success) {
				const updatedPosts = posts.filter((post) => post._id !== id);
				dispatch(setPost(updatedPosts));
				toast.success(response.data.message, TOAST_OPTION);
			} else {
				toast.error(response.data.message, TOAST_OPTION);
			}
		} catch (error) {
			toast.error("Something went wrong", TOAST_OPTION);
		}
	};

	const handleComment = async (id, text, setText) => {
		try {
			const response = await axios.post(
				`${API_URL}/post/comment/${id}`,
				{ comment: text },
				{
					withCredentials: true,
				}
			);
			if (response.data.success) {
				toast.success(response.data.message, TOAST_OPTION);
				setText("");
				const updatedPosts = posts.map((item) => {
					if (item._id === post._id) {
						return {
							...item,
							comments: [...item.comments, response.data.data],
						};
					}
					return item;
				});
				dispatch(setPostComments([response.data.data, ...comments]));
				dispatch(setPost(updatedPosts));
			} else {
				toast.error(
					response.data.message || "Something went wrong",
					TOAST_OPTION
				);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong", TOAST_OPTION);
		}
	};
	return (
		<div className="mx-auto max-w-sm border-b-2 border-gray-400 py-2 my-2 text-sm">
			<div className="flex justify-between items-center mb-2">
				<div className="flex gap-2 items-center">
					<Avatar className="h-10 w-10">
						<AvatarImage src={post.author.profilePic} />
						<AvatarFallback className="bg-slate-200 text-lg">
							{post.author.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<Link to={`/profile/${post.author._id}`}>
						<span className="font-semibold">
							{post.author.username}
						</span>
					</Link>
					<div>
						{post.author._id === user._id && (
							<span className="text-xs text-gray-400">
								Author
							</span>
						)}
					</div>
				</div>
				<Dialog>
					<DialogTrigger>
						<MoreHorizontal />
					</DialogTrigger>
					<DialogContent className="flex flex-col text-sm text-center max-w-sm">
						<Button variant="ghost">Unfollow</Button>
						<Button
							variant="ghost"
							onClick={() => handleAddToBookmark(post._id)}
						>
							{user.bookmarks.includes(post._id) ? (
								<span className="text-red-500">
									Remove from bookmarks
								</span>
							) : (
								<span>Add to bookmarks</span>
							)}
						</Button>
						{user._id === post.author._id && (
							<Button
								variant="ghost"
								onClick={() => deletePost(post._id)}
							>
								Delete
							</Button>
						)}
					</DialogContent>
				</Dialog>
			</div>
			<img
				className="w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-sm object-contain shadow-md hover:shadow-lg cursor-pointer mb-4"
				src={post.post_url}
				alt="img"
			/>
			<div className="flex justify-between items-center my-2">
				<div className="flex gap-3 items-center">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Heart
									className="cursor-pointer hover:text-gray-500"
									stroke={
										post.likes.includes(user._id)
											? "#e85d54"
											: "currentColor"
									}
									fill={
										post.likes.includes(user._id)
											? "#e85d54"
											: "none"
									}
									onClick={() =>
										handleLikeAndDislike(post._id)
									}
								/>
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
							<BookmarkIcon
								className="cursor-pointer hover:text-gray-500"
								fill={
									user.bookmarks.includes(post._id)
										? "black"
										: "none"
								}
								onClick={() => handleAddToBookmark(post._id)}
							/>
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
			<CommentDialogBox
				open={open}
				setOpen={setOpen}
				post={post}
				handleComment={handleComment}
				deletePost={deletePost}
				handleAddToBookmark={handleAddToBookmark}
			/>
			<div className="flex justify-between items-center gap-2">
				<input
					type="text"
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder="Add a comment..."
					className="w-full outline-none border-none bg-transparent"
				/>
				{text && (
					<span
						className="cursor-pointer text-blue-600"
						onClick={() => handleComment(post._id, text, setText)}
					>
						Post
					</span>
				)}
			</div>
		</div>
	);
}

export default Post;
