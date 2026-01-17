import { BASE_URL } from "@/data/constants";
import { Track } from "@/sharedTypes/track";
import axios from "axios";

export const getTracks = async (): Promise<Track[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/catalog/track/all/`);
        return response.data.data;
    } catch (error) {
        console.error("Ошибка при загрузке треков:", error);
        throw error;
    }
};