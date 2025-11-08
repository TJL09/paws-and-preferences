import api from "../axios/api";
import type { CatResponse, Cat } from "../types/catTypes";

export const getCats = async (limit: number): Promise<Cat[]> => {
    try {
        const response = await api.get<CatResponse[]>(`/cats?limit=100`);
        const data = response.data;

        //Shuffle array to assign random cats
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, limit);

        //Map the raw API data to the Cat's model
        return shuffled.map((cat) => ({
            id: cat.id,
            tags: cat.tags,
            imageUrl: `https://cataas.com/cat/${cat.id}`,
        }));

    } catch (error) {
        console.error("Error fetching cats:", error);
        return [];
    }
}