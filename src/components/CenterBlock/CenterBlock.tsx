import Link from "next/link";
import styles from "./centerblock.module.css";

export default function CenterBlock() {
    return (
        <div className={styles.centerblock}>
            {/* SEARCH */}
            <div className={styles.search}>
                <svg className={styles.searchSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
                </svg>

                <input
                    className={styles.searchText}
                    type="search"
                    placeholder="Поиск"
                    name="search"
                />
            </div>

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
                    {/* 1. Guilt / Nero / Welcome Reality / 4:44 */}
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
                                        Guilt <span className={styles.trackTitleSpan}></span>
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.trackAuthor}>
                                <Link className={styles.trackAuthorLink} href="">
                                    Nero
                                </Link>
                            </div>

                            <div className={styles.trackAlbum}>
                                <Link className={styles.trackAlbumLink} href="">
                                    Welcome Reality
                                </Link>
                            </div>

                            <div className={styles.trackTime}>
                                <svg className={styles.trackTimeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={styles.trackTimeText}>4:44</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Elektro / Dynoro... / Elektro / 2:22 */}
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
                                        Elektro <span className={styles.trackTitleSpan}></span>
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.trackAuthor}>
                                <Link className={styles.trackAuthorLink} href="">
                                    Dynoro, Outwork, Mr. Gee
                                </Link>
                            </div>

                            <div className={styles.trackAlbum}>
                                <Link className={styles.trackAlbumLink} href="">
                                    Elektro
                                </Link>
                            </div>

                            <div className={styles.trackTime}>
                                <svg className={styles.trackTimeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={styles.trackTimeText}>2:22</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. I’m Fire / Ali Bakgor / I’m Fire / 2:22 */}
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
                                        I’m Fire <span className={styles.trackTitleSpan}></span>
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.trackAuthor}>
                                <Link className={styles.trackAuthorLink} href="">
                                    Ali Bakgor
                                </Link>
                            </div>

                            <div className={styles.trackAlbum}>
                                <Link className={styles.trackAlbumLink} href="">
                                    I’m Fire
                                </Link>
                            </div>

                            <div className={styles.trackTime}>
                                <svg className={styles.trackTimeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={styles.trackTimeText}>2:22</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Non Stop (Remix) / Стоункат, Psychopath / Non Stop / 4:12 */}
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
                                        Non Stop
                                        <span className={styles.trackTitleSpan}>(Remix)</span>
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.trackAuthor}>
                                <Link className={styles.trackAuthorLink} href="">
                                    Стоункат, Psychopath
                                </Link>
                            </div>

                            <div className={styles.trackAlbum}>
                                <Link className={styles.trackAlbumLink} href="">
                                    Non Stop
                                </Link>
                            </div>

                            <div className={styles.trackTime}>
                                <svg className={styles.trackTimeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={styles.trackTimeText}>4:12</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Run Run (feat. AR/CO) / Jaded... / Run Run / 2:54 */}
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
                                        Run Run
                                        <span className={styles.trackTitleSpan}>
                                            (feat. AR/CO)
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.trackAuthor}>
                                <Link className={styles.trackAuthorLink} href="">
                                    Jaded, Will Clarke, AR/CO
                                </Link>
                            </div>

                            <div className={styles.trackAlbum}>
                                <Link className={styles.trackAlbumLink} href="">
                                    Run Run
                                </Link>
                            </div>

                            <div className={styles.trackTime}>
                                <svg className={styles.trackTimeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={styles.trackTimeText}>2:54</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
