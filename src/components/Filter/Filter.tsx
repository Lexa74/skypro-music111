"use client";

import {useState} from "react";
import styles from "./filter.module.css";
import FilterItem from "@components/FilterItem/FilterItem";
import {yearSortOptions} from "@/data/sortOptions";
import {useAppSelector} from "@/store/hooks";

export default function Filter() {
    const [activeFilter, setActiveFilter] = useState<null | "author" | "year" | "genre">(null);
    const tracks = useAppSelector(state => state.tracks.tracks) ?? [];

    const authors: string[] = [];
    const genres: string[] = [];

    if (tracks.length > 0) {
        authors.push(...new Set(tracks.map(t => t.author || "")));
        genres.push(...new Set(tracks.flatMap(t => t.genre || [])));
    }

    const toggleFilter = (type: "author" | "year" | "genre") => {
        setActiveFilter(prev => (prev === type ? null : type));
    };

    return (
        <div className={styles.filter}>
            <span className={styles.title}>Искать по:</span>

            <FilterItem
                label="исполнителю"
                isOpen={activeFilter === "author"}
                onClick={() => toggleFilter("author")}
                items={authors}
            />

            <FilterItem
                label="году выпуска"
                isOpen={activeFilter === "year"}
                onClick={() => toggleFilter("year")}
                items={yearSortOptions.map(o => o.label)}
            />

            <FilterItem
                label="жанру"
                isOpen={activeFilter === "genre"}
                onClick={() => toggleFilter("genre")}
                items={genres}
            />
        </div>
    );
}
