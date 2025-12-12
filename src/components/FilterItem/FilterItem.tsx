import styles from "./filterItem.module.css";

type filterItemProps = {
    label: string;
};

export default function FilterItem({ label }: filterItemProps) {
    return (
        <button className={styles.button}>
            {label}
        </button>
    );
}

