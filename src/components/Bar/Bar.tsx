"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./bar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    setCurrentTrack,
    setIsPlaying, toggleLike,
    toggleRepeat,
    toggleShuffle,
} from "@/store/features/trackSlice";
import { tracks } from "@/data/tracks";

export default function Bar() {
    const dispatch = useAppDispatch();
    const { currentTrack, isPlaying, isRepeat, isShuffle, staredByMe } = useAppSelector(
        (state) => state.tracks
    );

    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playlist, setPlaylist] = useState(tracks);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        if (isShuffle) {
            const shuffled = [...tracks].sort(() => Math.random() - 0.5);
            setPlaylist(shuffled);
            if (currentTrack) {
                const newIndex = shuffled.findIndex((t) => t._id === currentTrack._id);
                if (newIndex !== -1) setCurrentIndex(newIndex);
            }
        } else {
            setPlaylist(tracks);
            if (currentTrack) {
                const newIndex = tracks.findIndex((t) => t._id === currentTrack._id);
                if (newIndex !== -1) setCurrentIndex(newIndex);
            }
        }
    }, [isShuffle, currentTrack]);

    useEffect(() => {
        if (!audioRef.current || !currentTrack) return;

        audioRef.current.src = currentTrack.track_file;
        audioRef.current.volume = 0.7;

        if (isPlaying) {
            audioRef.current.play().catch(() => {});
        } else {
            audioRef.current.pause();
        }
    }, [currentTrack, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = isRepeat;
        }
    }, [isRepeat]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const loaded = () => setDuration(audio.duration || 0);
        const ended = () => {
            if (!isRepeat) {
                handleNext();
            }
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", loaded);
        audio.addEventListener("ended", ended);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", loaded);
            audio.removeEventListener("ended", ended);
        };
    }, [currentTrack, isRepeat]);

    const handlePlayPause = () => {
        dispatch(setIsPlaying(!isPlaying));
    };

    const handleNext = () => {
        if (playlist.length === 0) return;

        let nextIdx = currentIndex + 1;
        if (nextIdx >= playlist.length) {
            nextIdx = 0;
        }

        const nextTrack = playlist[nextIdx];
        dispatch(setCurrentTrack(nextTrack));
        setCurrentIndex(nextIdx);
        setCurrentTime(0);
    };

    const handlePrev = () => {
        if (playlist.length === 0) return;

        let prevIdx = currentIndex - 1;
        if (prevIdx < 0) {
            prevIdx = playlist.length - 1;
        }

        const prevTrack = playlist[prevIdx];
        dispatch(setCurrentTrack(prevTrack));
        setCurrentIndex(prevIdx);
        setCurrentTime(0);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    if (!currentTrack) return null;

    return (
        <div className={styles.bar}>
            <audio ref={audioRef} hidden />

            <div className={styles.content}>
                <input
                    type="range"
                    className={styles.playerProgress}
                    min={0}
                    max={duration || 1}
                    value={currentTime}
                    step="any"
                    onChange={handleSeek}
                    style={{ '--progress': `${(currentTime / (duration || 1)) * 100}%` } as React.CSSProperties}
                />

                <div className={styles.playerBlock}>
                    <div className={styles.player}>
                        <div className={styles.controls}>
                            <button className={styles.btnPrev} onClick={handlePrev}>
                                <svg className={styles.btnPrevSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
                                </svg>
                            </button>

                            <button className={styles.btnPlay} onClick={handlePlayPause}>
                                <svg className={styles.btnPlaySvg}>
                                    <use
                                        xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? "pause" : "play"}`}
                                    />
                                </svg>
                            </button>

                            <button className={styles.btnNext} onClick={handleNext}>
                                <svg className={styles.btnNextSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                                </svg>
                            </button>

                            <button
                                className={styles.btnRepeat}
                                onClick={() => dispatch(toggleRepeat())}
                                style={{ opacity: isRepeat ? 1 : 0.6 }}
                            >
                                <svg className={styles.btnRepeatSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
                                </svg>
                            </button>

                            <button
                                className={styles.btnShuffle}
                                onClick={() => dispatch(toggleShuffle())}
                                style={{ opacity: isShuffle ? 1 : 0.6 }}
                            >
                                <svg className={styles.btnShuffleSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
                                </svg>
                            </button>
                        </div>

                        <div className={styles.trackPlay}>
                            <div className={styles.trackContain}>
                                <div className={styles.trackImage}>
                                    <svg className={styles.trackSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                                    </svg>
                                </div>
                                <div>
                                    <div className={styles.trackAuthorLink}>
                                        {currentTrack.author}
                                    </div>
                                    <div className={styles.trackAlbumLink}>
                                        {currentTrack.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.likeBlock}>
                            <button
                                className={styles.like}
                                onClick={() => dispatch(toggleLike())}
                            >
                                <svg
                                    className={styles.likeSvg}
                                    style={{
                                        fill: staredByMe ? "#b672ff" : "transparent",
                                        stroke: staredByMe ? "#b672ff" : "#696969"
                                    }}
                                >
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                                </svg>
                            </button>
                        </div>

                    </div>

                    <div className={styles.volumeBlock}>
                        <div className={styles.volumeContent}>
                            <div className={styles.volumeImage}>
                                <svg className={styles.volumeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
                                </svg>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                defaultValue="0.7"
                                className={styles.volumeLine}
                                onChange={(e) => {
                                    if (audioRef.current) audioRef.current.volume = Number(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}