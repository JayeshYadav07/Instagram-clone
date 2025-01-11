import { API_URL, TOAST_OPTION } from "@/utils/constant";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import axios from "axios";
import { setPost } from "@/redux/postSlice";
function CreatePost({ open, setOpen }) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { posts } = useSelector((state) => state.post);
	const [img, setImg] = useState(null);
	const [caption, setCaption] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("file", img);
			formData.append("caption", caption);

			const response = await axios.post(`${API_URL}/post/add`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			});

			if (response.data.success) {
				toast.success(response.data.message, TOAST_OPTION);
				dispatch(setPost([response.data.data, ...posts]));
			} else {
				toast.error(response.data.message, TOAST_OPTION);
			}
		} catch (error) {
			toast.error(error.message, TOAST_OPTION);
		} finally {
			handleClose();
			setLoading(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
		setImg(null);
		setCaption("");
	};
	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<VisuallyHidden>
				<DialogTitle>Create New Post</DialogTitle>
			</VisuallyHidden>
			<DialogContent className="max-w-md">
				<h1 className="text-xl">Create New Post</h1>
				<div className="flex items-center gap-4">
					<Avatar className="h-10 w-10 border border-gray-300">
						<AvatarImage src={user.profilePic} />
						<AvatarFallback className="bg-white text-lg">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<h1>{user.username}</h1>
						<small className="text-gray-500">{user.bio}</small>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="description" className="text-sm">
						<textarea
							name="caption"
							id="caption"
							placeholder="Write a caption..."
							rows="2"
							className="w-full p-2 my-2 outline-none border-none"
							onChange={(e) => setCaption(e.target.value)}
							value={caption}
						></textarea>
					</label>
					{img && (
						<img
							src={URL.createObjectURL(img)}
							alt="img"
							className="w-full max-h-64 object-cover border border-gray-300 rounded p-2"
						/>
					)}
					<label
						htmlFor="file"
						className="cursor-pointer text-sm text-blue-500 hover:text-blue-600 border-2 border-dashed border-gray-300 rounded-md p-2 my-2 flex flex-col items-center justify-center"
					>
						<input
							type="file"
							name="file"
							id="file"
							className="hidden"
							accept="image/*"
							onChange={(e) => setImg(e.target.files[0])}
						/>
						<p className="text-center">Select a file to upload</p>
					</label>

					<Button
						type="submit"
						disabled={!img || loading}
						className="mt-2 w-full"
					>
						{loading ? "Uploading..." : "Upload"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default CreatePost;
