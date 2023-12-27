export interface INews {
    id: number;
    date: Date;
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