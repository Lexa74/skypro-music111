import styles from "./centerblock.module.css";
import Search from "@components/Search/Search";
import Filter from "@components/Filter/Filter";
import Track from "@components/Track/Track";
import { tracks } from "@/data/tracks";

export default function CenterBlock() {
    return (
        <section className={styles.centerblock}>
            <Search />

            <h2 className={styles.title}>Треки</h2>

            <Filter />

            <div className={styles.content}>
                <div className={styles.contentTitle}>
                    <div className={`${styles.playlistCol} ${styles.col01}`}>Трек</div>
                    <div className={`${styles.playlistCol} ${styles.col02}`}>Исполнитель</div>
                    <div className={`${styles.playlistCol} ${styles.col03}`}>Альбом</div>
                    <div className={`${styles.playlistCol} ${styles.col04}`}>
                        <svg className={styles.playlistColSvg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                        </svg>
                    </div>
                </div>

                <div className={styles.playlist}>
                    {tracks.map(track => (
                        <Track key={track._id} track={track} />
                    ))}
                </div>
            </div>
        </section>
    );
}
