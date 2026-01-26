import {BASE_URL} from "@/data/constants";
import {Track} from "@/sharedTypes/track";
import axios from "axios";

export const getTracks = async (): Promise<Track[]> => {
    try {
        const response = await axios.get<{ data: Track[] }>(`${BASE_URL}/catalog/track/all/`);
        return response.data.data;
    } catch (error) {
        console.error("Ошибка при загрузке треков:", error);
        throw error;
    }
};

export const getFavorites = async (token: string): Promise<Track[]> => {
    const response = await axios.get<{ data: Track[] }>(`${BASE_URL}/catalog/track/favorite/all/`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data.data;
};

export const addFavorite = async (id: number, token: string): Promise<void> => {
    await axios.post(`${BASE_URL}/catalog/track/${id}/favorite/`, {}, {
        headers: {Authorization: `Bearer ${token}`},
    });
};

export const removeFavorite = async (id: number, token: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/catalog/track/${id}/favorite/`, {
        headers: {Authorization: `Bearer ${token}`},
    });
};