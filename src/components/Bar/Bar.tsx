"use client";

import Link from "next/link";
import styles from "./bar.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useEffect, useRef, useState} from "react";
import {setIsPlaying, toggleRepeat, toggleShuffle} from "@/store/features/trackSlice";

export default function Bar() {
    const currentTrack = useAppSelector(state => state.tracks.currentTrack);
    const isPlaying = useAppSelector(state => state.tracks.isPlaying);
    const dispatch = useAppDispatch();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const isRepeat = useAppSelector(state => state.tracks.isRepeat);
    const isShuffle = useAppSelector(state => state.tracks.isShuffle);


    useEffect(() => {
        if (!audioRef.current || !currentTrack) return;

        audioRef.current.src = currentTrack.track_file;

        if (isPlaying) {
            audioRef.current.play().catch(() => {
            });
        } else {
            audioRef.current.pause();
        }
    }, [currentTrack, isPlaying]);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.loop = isRepeat;
    }, [isRepeat]);


    if (!currentTrack) return null;

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            dispatch(setIsPlaying(false));
        } else {
            audioRef.current.play().catch(() => {});
            dispatch(setIsPlaying(true));
        }
    };

    return (
        <div className={styles.bar}>
            <audio ref={audioRef} hidden/>

            <div className={styles.content}>
                <div className={styles.playerProgress}></div>

                <div className={styles.playerBlock}>
                    <div className={styles.player}>
                        <div className={styles.controls}>

                            <button className={styles.btnPrev}>
                                <img className={styles.iconBtnSvg} src="/img/icon/prev.svg" alt="Previous"/>
                            </button>

                            <button className={styles.btnPlay} onClick={togglePlay}>
                                <svg className={styles.btnPlaySvg}>
                                    <use
                                        xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? "pause" : "play"}`}
                                    />
                                </svg>
                            </button>

                            <button className={styles.btnNext}>
                                <img className={styles.iconBtnSvg} src="/img/icon/next.svg" alt="Next"/>
                            </button>

                            <button className={styles.btnRepeat}
                                 onClick={() => dispatch(toggleRepeat())}
                                 aria-pressed={isRepeat}
                                 title={isRepeat ? "Repeat: ON" : "Repeat: OFF"}
                            >
                                <img className={styles.iconBtnSvg} src="/img/icon/repeat.svg" alt="Repeat"/>
                            </button>

                            <button className={styles.btnShuffle}
                                 onClick={() => dispatch(toggleShuffle())}
                                 aria-pressed={isShuffle}
                                 title={isShuffle ? "Shuffle: ON" : "Shuffle: OFF"}
                            >
                                <img className={styles.iconBtnSvg} src="/img/icon/shuffle.svg" alt="Shuffle"/>
                            </button>

                        </div>

                        <div className={styles.trackPlay}>
                            <div className={styles.trackContain}>
                                <div className={styles.trackImage}>
                                    <svg className={styles.trackSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"/>
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
