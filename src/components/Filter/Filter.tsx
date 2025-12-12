import styles from "./filter.module.css";
import FilterItem from "@components/FilterItem/FilterItem";

export default function Filter() {
    return (
        <div className={styles.filter}>
            <span className={styles.title}>Искать по:</span>

            <FilterItem label="исполнителю" />
            <FilterItem label="году выпуска" />
            <FilterItem label="жанру" />
        </div>
    );
}
