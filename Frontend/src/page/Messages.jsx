import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useFetchChatUser from "@/hooks/useFetchChatUser";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Messages() {
	useFetchChatUser();
	const { user, chatUsers } = useSelector((state) => state.auth);
	const [selectedUser, setSelectedUser] = useState(null);
	const [message, setMessage] = useState("");

	const handleSendMessage = () => {
		console.log(user._id, selectedUser._id, message);
		setMessage("");
	};
	return (
		<div className="ml-1 h-screen overflow-hidden flex">
			<section className="flex flex-col gap-4	w-1/4 bg-white shadow h-screen">
				<div className="flex items-center gap-4 pt-6 px-2">
					<Avatar className="h-10 w-10 bg-slate-200">
						<AvatarImage src={user.profilePic} />
						<AvatarFallback className="text-lg">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col cursor-pointer">
						<span className="font-semibold">{user.username}</span>
					</div>
				</div>
				<div className="flex flex-1 flex-col gap-4 p-2 overflow-y-scroll">
					<span className="text-gray-400 text-xl">Messages</span>
					{chatUsers.map((item) => (
						<div
							key={item._id}
							className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded"
							onClick={() => setSelectedUser(item)}
						>
							<Avatar className="h-12 w-12 border">
								<AvatarImage src={item.profilePic} />
								<AvatarFallback className="bg-white text-xl">
									{item.username[0].toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col cursor-pointer">
								<span>{item.username}</span>
								<span className="text-xs text-gray-400">
									offline
								</span>
							</div>
						</div>
					))}
				</div>
			</section>
			<section className="flex-1 h-screen">
				{selectedUser ? (
					<div className="flex flex-col h-full">
						<div className="flex items-center gap-4 hover:bg-gray-100 p-4 rounded shadow-lg w-full">
							<Avatar className="h-12 w-12 border">
								<AvatarImage src={selectedUser.profilePic} />
								<AvatarFallback className="bg-white text-xl">
									{selectedUser.username[0].toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col cursor-pointer">
								<span>{selectedUser.username}</span>
								<span className="text-xs text-gray-400">
									offline
								</span>
							</div>
						</div>
						<div className="flex-1 p-6 overflow-y-scroll flex flex-col gap-3">
							{[1, 2, 3, 4, 5].map((item) => (
								<p>Messages</p>
							))}
						</div>
						<div className="w-full flex items-center gap-4 p-4">
							<input
								type="text"
								placeholder="Type a message"
								name="message"
								className="flex-1 px-5 py-3 rounded-3xl outline-none bg-gray-100 text-gray-600 text-md"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
							<Button
								onClick={handleSendMessage}
								disabled={!message.trim()}
								className="bg-blue-500 hover:bg-blue-400"
							>
								send
							</Button>
						</div>
					</div>
				) : (
					<div className="flex items-center justify-center h-full">
						<div className="flex flex-col items-center gap-3">
							<MessageCircle size={120} strokeWidth={2} />
							<h1 className="text-2xl">Your messages</h1>
							<p className="text-gray-400 text-md">
								Select a user to start a conversation
							</p>
						</div>
					</div>
				)}
			</section>
		</div>
	);
}

export default Messages;
