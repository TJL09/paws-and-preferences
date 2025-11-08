export interface CatResponse {
    id: string;
    tags?: string[];
}

export interface Cat {
    id: string;
    tags?: string[];
    imageUrl: string;
}