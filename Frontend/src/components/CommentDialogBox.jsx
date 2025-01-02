import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";

function CommentDialogBox({ open, setOpen }) {
	const [text, setText] = useState("");
	return (
		<Dialog open={open} onOpenChange={() => setOpen(false)}>
			<DialogContent className="text-sm md:flex md:max-w-5xl [&>button]:hidden">
				<div className="md:w-1/2 flex justify-center">
					<img
						src="https://github.com/shadcn.png"
						alt="post-img"
						className="w-full h-full object-cover rounded-lg"
					/>
				</div>
				<div className="md:w-1/2 flex flex-col">
					<div className="flex justify-between border-b border-gray-300 pb-2">
						<div className="flex gap-2 items-center">
							<Avatar className="h-10 w-10">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<span>Username</span>
						</div>
						<Dialog>
							<DialogTrigger>
								<MoreHorizontal />
							</DialogTrigger>
							<DialogContent className="flex flex-col text-sm text-center max-w-sm gap-2">
								<Button variant="ghost" className="mt-4">
									Unfollow
								</Button>
								<Button variant="ghost">
									Add to favorites
								</Button>
								<Button variant="ghost" className="mb-4">
									Delete
								</Button>
							</DialogContent>
						</Dialog>
					</div>
					<div className="flex-1 overflow-y-auto scrollbar-hide p-2 max-h-96 text-gray-500">
						<p>comment 1</p>
						<p>comment 2</p>
						<p>comment 3</p>
						<p>comment 4</p>
						<p>comment 5</p>
					</div>
					<div className="p-2 flex items-center gap-2">
						<input
							type="text"
							placeholder="Add a comment..."
							className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<button
							disabled={!text}
							className="disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100 border px-4 py-2 rounded"
						>
							Send
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default CommentDialogBox;
