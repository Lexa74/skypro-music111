"use client";

import {useMemo, useState} from "react";
import styles from "./filter.module.css";
import FilterItem from "@components/FilterItem/FilterItem";
import {yearSortOptions} from "@/data/sortOptions";
import {Track} from "@/sharedTypes/track";

interface FilterProps {
    tracks: Track[];
}

export default function Filter({ tracks }: FilterProps) {
    const [activeFilter, setActiveFilter] = useState<null | "author" | "year" | "genre">(null);

    const authors = useMemo(() => {
        const set = new Set<string>();
        for (const t of tracks) {
            if (t.author) set.add(t.author);
        }
        return Array.from(set);
    }, [tracks]);

    const genres = useMemo(() => {
        const set = new Set<string>();
        for (const t of tracks) {
            for (const g of t.genre || []) set.add(g);
        }
        return Array.from(set);
    }, [tracks]);

    const yearLabels = useMemo(() => yearSortOptions.map((o) => o.label), []);

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
                items={yearLabels}
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
