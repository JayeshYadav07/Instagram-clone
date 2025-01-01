import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
	Compass,
	LogOut,
	LucideHome,
	MessageCircle,
	Plus,
	Search,
} from "lucide-react";

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
			<Avatar className="h-6 w-6">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		),
	},
	{
		id: crypto.randomUUID(),
		title: "Logout",
		icon: <LogOut />,
	},
];

export default sidebarItem;
