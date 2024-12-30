import { API_URL, TOAST_OPTION } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function Login() {
	const [input, setInput] = useState({
		username: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const response = await axios.post(`${API_URL}/user/login`, input, {
				withCredentials: true,
			});
			if (response.data.success) {
				toast.success(response.data.message, TOAST_OPTION);
			} else {
				toast.error(response.data.message, TOAST_OPTION);
			}
		} catch (error) {
			toast.error(
				error.response.data.message || error.message,
				TOAST_OPTION
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="shadow-md rounded p-4 flex flex-col gap-4 md:min-w-[400px]"
			>
				<h1 className="text-3xl font-semibold text-center">Login</h1>
				<div className="flex flex-col gap-2">
					<span>Username</span>
					<Input
						type="text"
						placeholder="Username"
						name="username"
						onChange={handleChange}
						required={true}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<span>Password</span>
					<Input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						required={true}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Button disabled={loading}>
						Login
						{loading && <Loader className="animate-spin ml-2" />}
					</Button>
					<small className="text-center">
						Don&apos;t have an account?{" "}
						<span className="underline text-blue-500">Signup</span>
					</small>
				</div>
			</form>
		</div>
	);
}
