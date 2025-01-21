"use client";

import Image from "next/image";
import { type FC, useState } from "react";
import { useDebounce } from "use-debounce";
import { useCollections } from "../../_lib/api/useCollections";

type Props = {
	id: string;
	index: number;
	isSelected: boolean;
	colKey: string;
	onSelect: (id: string) => void;
};

const Card: FC<Props> = ({ id, isSelected, onSelect, index, colKey }) => (
	<div
		onClick={() => onSelect(id)}
		className={`contain-content
      relative cursor-pointer 
      transform transition-all duration-200 ease-in-out
      hover:scale-105 hover:opacity-100
      overflow-hidden
      ${isSelected ? "opacity-100" : "opacity-50"}`}
	>
		<Image
			src={`/assets/img/deck/${colKey}/${index}_l.webp`}
			alt={`Card ${id}`}
			width={400}
			height={450}
			loading="lazy"
			placeholder="blur"
			blurDataURL={`/assets/img/deck/${colKey}/${index}_s.webp`}
		/>
		<div className="absolute bottom-0 overflow-hidden bg-blue-200 w-full rounded-md p-2">
			<p>Hi</p>
		</div>
	</div>
);

export default function Page(): JSX.Element {
	const { data } = useCollections();
	const [selectedCards, setSelectedCards] = useState(new Set<string>());
	const [value] = useDebounce(selectedCards, 750);

	console.log(value);

	const toggleCard = (id: string) => {
		setSelectedCards((prev) => {
			const newSelected = new Set(prev);
			if (newSelected.has(id)) {
				newSelected.delete(id);
			} else {
				newSelected.add(id);
			}
			return newSelected;
		});
	};

	return (
		<div className="mx-auto p-4 bg-blue-400">
			<img
				src="https://i.imgur.com/0NoT3Ji.png"
				height={100}
				width={300}
				className="mx-auto my-4"
				alt="Card Jitsu Logo"
			/>
			{data && (
				<div>
					{data.map((collection) => (
						<div key={collection.key}>
							<p className="text-7xl font-bold text-gray-200 my-6">
								{collection.name}
							</p>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
								{collection.cards.map((card) => {
									const id = `${collection.key}-${card.index}`;
									return (
										<Card
											colKey={collection.key}
											key={id}
											id={id}
											index={card.index}
											isSelected={selectedCards.has(id)}
											onSelect={toggleCard}
										/>
									);
								})}
							</div>
						</div>
					))}
				</div>
			)}

			<div className="mt-4 p-4 bg-gray-100 rounded-lg">
				<p className="text-sm text-gray-700">
					Selected cards: {Array.from(selectedCards).join(", ")}
				</p>
			</div>
		</div>
	);
}
