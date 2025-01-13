import Feed from "@/components/Feed";
import useFetchPosts from "@/hooks/useFetchPosts";
import useFetchSuggestedUser from "@/hooks/useFetchSuggestedUser";

function Home() {
	useFetchPosts();
	useFetchSuggestedUser();
	return (
		<div>
			<h1 className="text-2xl text-center">Suggested Posts</h1>
			<Feed />
		</div>
	);
}

export default Home;
