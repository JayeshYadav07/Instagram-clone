import React from "react";
import Post from "./Post";

export default function Feed() {
	return (
		<div>
			{[1, 2, 3].map((post) => (
				<div key={post}>
					<Post />
				</div>
			))}
		</div>
	);
}
