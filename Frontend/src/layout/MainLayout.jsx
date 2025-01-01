import LeftSidebar from "@/components/LeftSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<div className="grid grid-cols-6">
			<div className="col-span-1 h-screen">
				<LeftSidebar />
			</div>
			<div className="col-span-5">
				<Outlet />
			</div>
		</div>
	);
}

export default MainLayout;
