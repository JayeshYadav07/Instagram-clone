import { API_URL, TOAST_OPTION } from "@/utils/constant";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Signup() {
	const navigate = useNavigate();
	const [input, setInput] = useState({
		username: "",
		email: "",
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
			const response = await axios.post(
				`${API_URL}/user/register`,
				input,
				{
					withCredentials: true,
				}
			);
			if (response.data.success) {
				toast.success(response.data.message, TOAST_OPTION);
				navigate("/login");
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
				<h1 className="text-3xl font-semibold text-center">Signup</h1>
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
					<span>Email</span>
					<Input
						type="email"
						placeholder="Email"
						name="email"
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
					{loading ? (
						<Button disabled>
							<Loader className="animate-spin ml-2" />
							<span>Please Wait</span>
						</Button>
					) : (
						<Button>Signup</Button>
					)}
					<small className="text-center">
						Already have an account?{" "}
						<span className="underline text-blue-500">
							<Link to="/login">Login</Link>
						</span>
					</small>
				</div>
			</form>
		</div>
	);
}
