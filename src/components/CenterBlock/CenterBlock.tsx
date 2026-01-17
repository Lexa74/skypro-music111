import styles from "./centerblock.module.css";
import Search from "@components/Search/Search";
import Filter from "@components/Filter/Filter";
import Track from "@components/Track/Track";
import {Track as TrackType} from "@/sharedTypes/track";

interface CenterBlockProps {
    tracks: TrackType[];
}

export default function CenterBlock( {tracks}: CenterBlockProps ) {
    const safeTracks = Array.isArray(tracks) ? tracks : [];

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
                    {safeTracks.length > 0 ? (
                        safeTracks.map((track) => (
                            <Track key={track._id} track={track} />
                        ))
                    ) : (
                        <div className={styles.tracks_notFound}>
                            Треков пока нет
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
