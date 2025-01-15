import Login from "./components/Login";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import MainLayout from "./layout/MainLayout";
import Profile from "./page/Profile";
import EditProfile from "./page/EditProfile";
export default function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: "/home",
					element: <Home />,
				},
				{
					path: "/profile/:id",
					element: <Profile />,
				},
				{
					path: "/edit",
					element: <EditProfile />,
				},
			],
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/signup",
			element: <Signup />,
		},
	]);
	return <RouterProvider router={router} />;
}
