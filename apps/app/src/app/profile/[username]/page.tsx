"use client";

export default function Page({ params }: { params: { username: string } }) {
	console.log("Params received:", params); // Add this to debug

	if (!params || !params.username) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Profile for @{params.username}</h1>
		</div>
	);
}
