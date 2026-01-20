import styles from "./filterItem.module.css";

type filterItemProps = {
    label: string;
    isOpen: boolean;
    onClick: () => void;
    items: (string | number)[];
};

export default function FilterItem({label, isOpen, onClick, items}: filterItemProps) {
    return (

        <div className={styles.wrapper}>
            <button
                className={`${styles.button} ${isOpen ? styles.active : ""}`}
                onClick={onClick}
            >
                {label}
                {isOpen && (
                    <span className={styles.count}>{items.length}</span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <ul className={styles.list}>
                        {items.map((item, index) => (
                            <li key={`${item}-${index}`} className={styles.item}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

