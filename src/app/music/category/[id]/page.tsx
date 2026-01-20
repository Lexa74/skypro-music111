"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import {Track} from "@/sharedTypes/track";
import {BASE_URL} from "@/data/constants";

interface SelectionResponse {
    success: boolean;
    data: {
        _id: number;
        name: string;
        items: number[];
    } | null;
}

export default function CategoryPage() {
    const {id} = useParams<{ id: string }>();
    const [tracks, setTracks] = useState<Track[]>([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTitle("");
        setLoading(true);

        const load = async () => {
            try {
                const res = await fetch(`${BASE_URL}/catalog/selection/${id}/`);
                const json: SelectionResponse = await res.json();
                const data = json.data;

                setTitle(data?.name || `Подборка ${id}`)

                if (!data?.items?.length) {
                    setTracks([])
                    return
                }

                const promises = data.items.map((trackId: number) =>
                    fetch(`${BASE_URL}/catalog/track/${trackId}/`)
                        .then(r => r.json())
                        .then(j => j.data || j)
                )

                const loaded = await Promise.all(promises)
                setTracks(loaded)
            } catch {
                setTitle("Ошибка")
                setTracks([])
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [id])

    return (
        <CenterBlock
            key={`playlist-${id}`}
            tracks={tracks}
            title={title || "..."}
            isLoading={loading}
        />
    );
}