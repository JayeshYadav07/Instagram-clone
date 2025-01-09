import Feed from "@/components/Feed";
import useFetchPosts from "@/hooks/useFetchPosts";

function Home() {
	useFetchPosts();
	return (
		<div>
			<h1 className="text-2xl text-center">Suggested Posts</h1>
			<Feed />
		</div>
	);
}

export default Home;
