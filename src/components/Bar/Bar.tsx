import Link from "next/link";
import styles from "./bar.module.css";

export default function Bar() {
    return (
        <div className={styles.bar}>
            <div className={styles.content}>

                <div className={styles.playerProgress}></div>

                <div className={styles.playerBlock}>

                    {/* LEFT PLAYER SIDE */}
                    <div className={styles.player}>
                        <div className={styles.controls}>

                            <div className={styles.btnPrev}>
                                <svg className={styles.btnPrevSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                                </svg>
                            </div>

                            <div className={styles.btnPlay}>
                                <svg className={styles.btnPlaySvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                                </svg>
                            </div>

                            <div className={styles.btnNext}>
                                <svg className={styles.btnNextSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                                </svg>
                            </div>

                            <div className={styles.btnRepeat}>
                                <svg className={styles.btnRepeatSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                                </svg>
                            </div>

                            <div className={styles.btnShuffle}>
                                <svg className={styles.btnShuffleSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                                </svg>
                            </div>
                        </div>

                        {/* TRACK INFO */}
                        <div className={styles.trackPlay}>
                            <div className={styles.trackContain}>
                                <div className={styles.trackImage}>
                                    <svg className={styles.trackSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>

                                <div className={styles.trackAuthor}>
                                    <Link className={styles.trackAuthorLink} href="">
                                        Ты та...
                                    </Link>
                                </div>

                                <div className={styles.trackAlbum}>
                                    <Link className={styles.trackAlbumLink} href="">
                                        Баста
                                    </Link>
                                </div>
                            </div>

                            {/* LIKE / DISLIKE */}
                            <div className={styles.likeBlock}>
                                <div className={styles.like}>
                                    <svg className={styles.likeSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                    </svg>
                                </div>

                                <div className={styles.dislike}>
                                    <svg className={styles.dislikeSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VOLUME */}
                    <div className={styles.volumeBlock}>
                        <div className={styles.volumeContent}>

                            <div className={styles.volumeImage}>
                                <svg className={styles.volumeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                                </svg>
                            </div>

                            <div className={styles.volumeProgress}>
                                <input
                                    className={styles.volumeLine}
                                    type="range"
                                    name="range"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
