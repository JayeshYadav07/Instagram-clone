import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";
import useFetchPosts from "@/hooks/useFetchPosts";
import useFetchSuggestedUser from "@/hooks/useFetchSuggestedUser";

function Home() {
	useFetchPosts();
	useFetchSuggestedUser();
	return (
		<div className="flex justify-between">
			<div className="flex-1 p-4">
				<h1 className="text-2xl text-center">Suggested Posts</h1>
				<Feed />
			</div>
			<RightSidebar />
		</div>
	);
}

export default Home;
