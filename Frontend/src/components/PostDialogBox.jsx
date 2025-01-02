import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function PostDialogBox({ open, setOpen }) {
	return (
		<Dialog open={open} onOpenChange={() => setOpen(false)}>
			<DialogContent>
				<div className="flex justify-between items-center">
					<img src="https://github.com/shadcn.png" alt="post-img" />
					<div>
						<div className="flex gap-2 items-center">
							<Avatar className="h-10 w-10">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<span>Username</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default PostDialogBox;
