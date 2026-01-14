"use client";

import Link from "next/link";
import styles from "./bar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef } from "react";
import { setIsPlaying } from "@/store/features/trackSlice";

export default function Bar() {
    const currentTrack = useAppSelector(state => state.tracks.currentTrack);
    const isPlaying = useAppSelector(state => state.tracks.isPlaying);
    const dispatch = useAppDispatch();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current || !currentTrack) return;

        audioRef.current.src = currentTrack.track_file;
        audioRef.current.play().then(r => {});
        dispatch(setIsPlaying(true));
    }, [currentTrack, dispatch]);

    if (!currentTrack) return null;

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            dispatch(setIsPlaying(false));
        } else {
            audioRef.current.play();
            dispatch(setIsPlaying(true));
        }
    };

    return (
        <div className={styles.bar}>
            <audio ref={audioRef} hidden />

            <div className={styles.content}>
                <div className={styles.playerProgress}></div>

                <div className={styles.playerBlock}>
                    <div className={styles.player}>
                        <div className={styles.controls}>

                            <div className={styles.btnPrev}>
                                <img className={styles.iconBtnSvg} src="/img/icon/prev.svg" alt="Previous" />
                            </div>

                            <div className={styles.btnPlay} onClick={togglePlay}>
                                <svg className={styles.btnPlaySvg}>
                                    <use
                                        xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? "pause" : "play"}`}
                                    />
                                </svg>
                            </div>

                            <div className={styles.btnNext}>
                                <img className={styles.iconBtnSvg} src="/img/icon/next.svg" alt="Next" />
                            </div>

                            <div className={styles.btnRepeat}>
                                <img className={styles.iconBtnSvg} src="/img/icon/repeat.svg" alt="Repeat" />
                            </div>

                            <div className={styles.btnShuffle}>
                                <img className={styles.iconBtnSvg} src="/img/icon/shuffle.svg" alt="Shuffle" />
                            </div>

                        </div>

                        <div className={styles.trackPlay}>
                            <div className={styles.trackContain}>
                                <div className={styles.trackImage}>
                                    <svg className={styles.trackSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                                    </svg>
                                </div>

                                <div className={styles.trackAuthor}>
                                    <Link className={styles.trackAuthorLink} href="#">
                                        {currentTrack.author}
                                    </Link>
                                </div>

                                <div className={styles.trackAlbum}>
                                    <Link className={styles.trackAlbumLink} href="#">
                                        {currentTrack.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.volumeBlock}>
                        <div className={styles.volumeContent}>
                            <div className={styles.volumeProgress}>
                                <input
                                    type="range"
                                    className={styles.volumeLine}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onChange={e => {
                                        if (audioRef.current) {
                                            audioRef.current.volume = Number(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
