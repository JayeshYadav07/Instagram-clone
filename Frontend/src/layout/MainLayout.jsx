import LeftSidebar from "@/components/LeftSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<div className="flex h-screen overflow-hidden bg-gray-100">
			<LeftSidebar />
			<div className="flex-grow overflow-y-scroll scrollbar-hide">
				<Outlet />
			</div>
		</div>
	);
}

export default MainLayout;
