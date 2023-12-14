export interface INews {
    id: number;
    date: string;
    isGrowing: boolean;
    title: string;
    price: number;
    source: string;
    tags: ITag[];
}

export interface ITag {
    id: number;
    tag: string;
} 