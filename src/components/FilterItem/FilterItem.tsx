import styles from "./filterItem.module.css";

type Item = string | { id: string; label: string };

interface FilterItemProps {
    label: string;
    isOpen: boolean;
    onClick: () => void;
    items: Item[];
    selected?: string[] | string | null;
    onToggle?: (item: string) => void;
    onSelect?: (id: string) => void;
}

export default function FilterItem({
                                       label,
                                       isOpen,
                                       onClick,
                                       items,
                                       selected,
                                       onToggle,
                                       onSelect,
}: FilterItemProps) {

    const isMulti = Array.isArray(selected);
    const count = Array.isArray(selected) ? selected.length : selected ? 1 : 0;

    const getItemValue = (item: Item) =>
        typeof item === "string" ? item : item.id;
    const getItemLabel = (item: Item) =>
        typeof item === "string" ? item : item.label;

    const isSelected = (value: string) =>
        Array.isArray(selected) ? selected.includes(value) : selected === value;


    const handleItemClick = (item: Item) => {
        const value = getItemValue(item);
        if (isMulti && onToggle) {
            onToggle(value);
        } else if (!isMulti && onSelect) {
            onSelect(value);
        }
    };
    return (

        <div className={styles.wrapper}>
            <button
                className={`${styles.button} ${isOpen ? styles.active : ""}`}
                onClick={onClick}
            >
                {label}
                {count > 0 && <span className={styles.count}>{count}</span>}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <ul className={styles.list}>
                        {items.map((item, index) => {
                            const value = getItemValue(item);
                            return (
                                <li
                                    key={`${value}-${index}`}
                                    className={`${styles.item} ${isSelected(value) ? styles.itemSelected : ""}`}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {getItemLabel(item)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

