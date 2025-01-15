import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainLayout from "./layout/MainLayout";
import EditProfile from "./page/EditProfile";
import Home from "./page/Home";
import Messages from "./page/Messages";
import Profile from "./page/Profile";
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
					path: "/profile/:id",
					element: <Profile />,
				},
				{
					path: "/edit",
					element: <EditProfile />,
				},
				{
					path: "/messages",
					element: <Messages />,
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
