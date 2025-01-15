import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { setAuthUser } from "@/redux/authSlice";
import { API_URL, TOAST_OPTION } from "@/utils/constant";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function EditProfile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const [preview, setPreview] = useState(null);
	const [img, setImg] = useState(null);
	const [bio, setBio] = useState("");
	const [gender, setGender] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", img);
			formData.append("bio", bio);
			formData.append("gender", gender);

			const response = await axios.patch(
				`${API_URL}/user/profile-update`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);

			if (response.status === 200) {
				toast.success(response.data.message, TOAST_OPTION);
				dispatch(setAuthUser(response.data.data));
				navigate("/profile/" + user._id);
			} else {
				console.log(response.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImg(file);
		setPreview(URL.createObjectURL(file));
	};
	return (
		<div className="w-full lg:w-2/3 mx-auto my-4 md:my-8 p-4 flex flex-col gap-6">
			<h1 className="text-2xl">Edit Profile</h1>
			<div className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 bg-slate-100 rounded-lg">
				<Avatar className="h-14 w-14 bg-slate-200 border text-xl">
					<AvatarImage src={preview || user.profilePic} />
					<AvatarFallback>
						{user.username[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<span className="font-medium text-xl">{user.username}</span>
					<span className="text-gray-700 text-sm">{user.bio}</span>
				</div>
				<div className="ml-auto">
					<input
						type="file"
						id="file"
						accept="image/*"
						hidden
						onChange={handleImageChange}
					/>
					<label htmlFor="file" className="cursor-pointer">
						<p className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap hover:bg-blue-600">
							Change Photo
						</p>
					</label>
				</div>
			</div>
			<div>
				<h1 className="mb-3">Bio</h1>
				<textarea
					className="w-full h-30 outline-none border rounded-lg p-4"
					value={bio}
					name="bio"
					placeholder="Bio"
					onChange={(e) => setBio(e.target.value)}
				></textarea>
			</div>
			<div>
				<h1 className="mb-3">Gender</h1>
				<Select onValueChange={(e) => setGender(e)}>
					<SelectTrigger className="w-full h-12">
						<SelectValue placeholder="Select a Gender" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="male">Male</SelectItem>
							<SelectItem value="female">Female</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="flex justify-end">
				{!loading ? (
					<Button
						className="bg-blue-500 text-white items-end hover:bg-blue-600 px-8"
						onClick={handleSubmit}
					>
						{" "}
						Save Changes
					</Button>
				) : (
					<Button
						className="bg-blue-500 text-white items-end hover:bg-blue-600 px-8"
						disabled
					>
						<Loader className="animate-spin" />
						Uploading
					</Button>
				)}
			</div>
		</div>
	);
}

export default EditProfile;
