import LeftSidebar from "@/components/LeftSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<div className="flex h-screen overflow-hidden">
			<LeftSidebar />
			<div className="flex-1 overflow-y-scroll scrollbar-hide">
				<Outlet />
			</div>
		</div>
	);
}

export default MainLayout;
