"use client";

import styles from "./search.module.css";
import React from "react";

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={styles.search}>
            <svg className={styles.searchSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
            </svg>

            <input
                className={styles.searchText}
                type="search"
                placeholder="Поиск"
                name="search"
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}