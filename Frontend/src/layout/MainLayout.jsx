import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<div className="flex h-screen overflow-hidden bg-gray-100">
			<LeftSidebar />
			<div className="flex-grow p-4 overflow-y-scroll scrollbar-hide">
				<Outlet />
			</div>
			<RightSidebar />
		</div>
	);
}

export default MainLayout;
