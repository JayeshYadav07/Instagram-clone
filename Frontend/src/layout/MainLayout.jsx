import LeftSidebar from "@/components/LeftSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
	return (
		<div className="grid grid-cols-5">
			<div className="col-span-1">
				<LeftSidebar />
			</div>
			<div className="col-span-4">
				<Outlet />
			</div>
		</div>
	);
}

export default MainLayout;
