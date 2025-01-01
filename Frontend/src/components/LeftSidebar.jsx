import SidebarItem from "./SidebarItem";
import sidebarItem from "@/utils/sidebarItems";

function LeftSidebar() {
	return (
		<div className="border-r-2 border-gray-500 h-full px-2 py-4">
			<div>
				<h1 className="text-2xl font-normal p-2 cursor-pointer mb-4">
					Instagram
				</h1>
			</div>
			<div className="flex flex-col gap-4">
				{sidebarItem.map((item) => {
					return <SidebarItem key={item.id} {...item} />;
				})}
			</div>
		</div>
	);
}

export default LeftSidebar;
