import { useQuery } from "@tanstack/react-query";
import type { CollectionResponse } from "../types";

export const useCollections = () =>
	useQuery<undefined, undefined, CollectionResponse>({
		queryKey: ["collections"],
		queryFn: async () => {
			const res = await fetch("http://localhost:3005");
			return res.json();
		},
	});
