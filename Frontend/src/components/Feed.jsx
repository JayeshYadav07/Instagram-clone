import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

export default function Feed() {
	const { posts } = useSelector((state) => state.post);

	return (
		<div>
			{posts.map((post) => (
				<div key={post._id}>
					<Post post={post} />
				</div>
			))}
		</div>
	);
}
