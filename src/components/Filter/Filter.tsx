"use client";

import {useState} from "react";
import styles from "./filter.module.css";
import FilterItem from "@components/FilterItem/FilterItem";
import {tracks} from "@/data/tracks";
import {yearSortOptions} from "@/data/sortOptions";

export default function Filter() {
    const [activeFilter, setActiveFilter] = useState<null | "author" | "year" | "genre">(null);

    const authors = Array.from(new Set(tracks.map(t => t.author)));
    const genres = Array.from(
        new Set(tracks.flatMap(track => track.genre))
    );

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
                items={yearSortOptions.map(option => option.label)}
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
