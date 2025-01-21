export type CollectionResponse = Array<Collection>;

export type Collection = {
	key: string;
	name: string;
	img: string;
	cards: Card[];
};

export type Card = {
	name: string;
	index: number;
};
