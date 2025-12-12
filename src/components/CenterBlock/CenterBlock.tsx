import Link from "next/link";
import styles from "./centerblock.module.css";
import Search from "@components/Search/Search";
import {tracks} from "@/data/tracks";
import {formatTime} from "@utils/helper";

export default function CenterBlock() {
    return (
        <div className={styles.centerblock}>

            {/* SEARCH */}
            <Search />

            {/* TITLE */}
            <h2 className={styles.title}>Треки</h2>

            {/* FILTERS */}
            <div className={styles.filter}>
                <div className={styles.filterTitle}>Искать по:</div>
                <div className={styles.filterButton}>исполнителю</div>
                <div className={styles.filterButton}>году выпуска</div>
                <div className={styles.filterButton}>жанру</div>
            </div>

            {/* CONTENT */}
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

                {/* PLAYLIST */}
                <div className={styles.playlist}>
                    {tracks.map((track) => (
                        <div className={styles.playlistItem}>
                            <div className={styles.playlistTrack}>
                                <div className={styles.trackTitle}>
                                    <div className={styles.trackTitleImage}>
                                        <svg className={styles.trackTitleSvg}>
                                            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                        </svg>
                                    </div>

                                    <div className={styles.trackTitleText}>
                                        <Link className={styles.trackTitleLink} href="">
                                            {track.name} <span className={styles.trackTitleSpan}></span>
                                        </Link>
                                    </div>
                                </div>

                                <div className={styles.trackAuthor}>
                                    <Link className={styles.trackAuthorLink} href="">
                                        {track.author}
                                    </Link>
                                </div>

                                <div className={styles.trackAlbum}>
                                    <Link className={styles.trackAlbumLink} href="">
                                        {track.album}
                                    </Link>
                                </div>

                                <div className={styles.trackTime}>
                                    <svg className={styles.trackTimeSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                    </svg>
                                    <span className={styles.trackTimeText}>{formatTime(track.duration_in_seconds)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
