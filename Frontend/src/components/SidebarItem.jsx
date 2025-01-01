export default function SidebarItem({ icon, title, onClick }) {
	return (
		<div
			className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100"
			onClick={onClick}
		>
			{icon} <span>{title}</span>
		</div>
	);
}
