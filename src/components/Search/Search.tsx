"use client";

import styles from "./search.module.css";
import React, {useState} from "react";

export default function Search(){
    const [searchInput, setSearchInput] = useState('')

    const oneSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }
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
                value={searchInput}
                onChange={oneSearchInput}
            />
        </div>
    )
}