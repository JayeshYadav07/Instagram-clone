import { API_URL } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export default function Signup() {
	const [input, setInput] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${API_URL}/user/register`,
				input,
				{
					withCredentials: true,
				}
			);
			if (response.data.success) {
				toast.success(response.data.message, {
					richColors: true,
				});
			} else {
				toast.error(response.data.message, {
					richColors: true,
				});
			}
		} catch (error) {
			toast.error(error.response.data.message || error.message, {
				richColors: true,
			});
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="shadow-md rounded p-4 flex flex-col gap-4 md:min-w-[400px]"
			>
				<h1 className="text-3xl font-semibold text-center">Signup</h1>
				<div className="flex flex-col gap-2">
					<span>Username</span>
					<Input
						type="text"
						placeholder="Username"
						name="username"
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<span>Email</span>
					<Input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<span>Password</span>
					<Input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Button>Signup</Button>
					<small className="text-center">
						Already have an account?{" "}
						<span className="underline text-blue-500">Login</span>
					</small>
				</div>
			</form>
		</div>
	);
}
