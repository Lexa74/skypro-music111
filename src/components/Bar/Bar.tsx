"use client";

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styles from "./bar.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {
    setCurrentTrack,
    setIsPlaying,
    toggleRepeat,
    toggleShuffle, toggleTrackLike,
} from "@/store/features/trackSlice";
import {formatTime} from "@utils/helper";

function shuffleArray<T>(arr: T[]) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export default function Bar() {
    const dispatch = useAppDispatch();
    const {currentTrack, isPlaying, isRepeat, isShuffle, tracks} = useAppSelector(
        (state) => state.tracks
    );

    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const isLiked = useAppSelector((state) => {
        if (!currentTrack) return false;
        return state.tracks.likedIds.includes(currentTrack._id);
    });

    const playlist = useMemo(() => {
        if (!Array.isArray(tracks) || tracks.length === 0) return [];
        return isShuffle ? shuffleArray(tracks) : tracks;
    }, [tracks, isShuffle]);

    const currentIndex = useMemo(() => {
        if (!currentTrack) return -1;
        return playlist.findIndex((t) => t._id === currentTrack._id);
    }, [playlist, currentTrack]);

    const handlePlayPause = useCallback(() => {
        dispatch(setIsPlaying(!isPlaying));
    }, [dispatch, isPlaying]);

    const handleNext = useCallback(() => {
        if (!playlist.length) return;

        const nextIdx = currentIndex >= 0 ? (currentIndex + 1) % playlist.length : 0;
        dispatch(setCurrentTrack(playlist[nextIdx]));
    }, [dispatch, playlist, currentIndex]);

    const handlePrev = useCallback(() => {
        if (!playlist.length) return;

        const prevIdx =
            currentIndex >= 0 ? (currentIndex - 1 + playlist.length) % playlist.length : playlist.length - 1;
        dispatch(setCurrentTrack(playlist[prevIdx]));
    }, [dispatch, playlist, currentIndex]);

    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const time = Number(e.target.value);
        audio.currentTime = time;
        setCurrentTime(time);
    }, []);

    const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = Number(e.target.value);
    }, []);

    const progressStyle = useMemo(
        () =>
            ({
                "--progress": `${(currentTime / (duration || 1)) * 100}%`,
            }) as React.CSSProperties,
        [currentTime, duration]
    );

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack) return;

        if (audio.src !== currentTrack.track_file) {
            audio.src = currentTrack.track_file;
            audio.currentTime = 0;
            setCurrentTime(0);
        }

        audio.volume = 0.7;

        if (isPlaying) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
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


    if (!currentTrack) return null;

    return (
        <div className={styles.bar}>
            <audio ref={audioRef} hidden/>

            <div className={styles.content}>
                <div className={styles.progressWrapper}>
                    <span className={styles.timeCurrent}>{formatTime(currentTime)}</span>

                    <input
                        type="range"
                        className={styles.playerProgress}
                        min={0}
                        max={duration || 1}
                        value={currentTime}
                        step="any"
                        onChange={handleSeek}
                        style={progressStyle}
                    />

                    <span className={styles.timeTotal}>{formatTime(duration)}</span>
                </div>

                <div className={styles.playerBlock}>
                    <div className={styles.player}>
                        <div className={styles.controls}>
                            <button className={styles.btnPrev} onClick={handlePrev}>
                                <svg className={styles.btnPrevSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"/>
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
                                    <use xlinkHref="/img/icon/sprite.svg#icon-next"/>
                                </svg>
                            </button>

                            <button
                                className={styles.btnRepeat}
                                onClick={() => dispatch(toggleRepeat())}
                                style={{opacity: isRepeat ? 1 : 0.6}}
                            >
                                <svg className={styles.btnRepeatSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-repeat"/>
                                </svg>
                            </button>

                            <button
                                className={styles.btnShuffle}
                                onClick={() => dispatch(toggleShuffle())}
                                style={{opacity: isShuffle ? 1 : 0.6}}
                            >
                                <svg className={styles.btnShuffleSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"/>
                                </svg>
                            </button>
                        </div>

                        <div className={styles.trackPlay}>
                            <div className={styles.trackContain}>
                                <div className={styles.trackImage}>
                                    <svg className={styles.trackSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"/>
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    currentTrack && dispatch(toggleTrackLike(currentTrack._id));
                                }}
                            >
                                <svg
                                    className={styles.likeSvg}
                                    style={{
                                        fill: isLiked ? "#b672ff" : "transparent",
                                        stroke: isLiked ? "#b672ff" : "#696969"
                                    }}
                                >
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"/>
                                </svg>
                            </button>
                        </div>

                    </div>

                    <div className={styles.volumeBlock}>
                        <div className={styles.volumeContent}>
                            <div className={styles.volumeImage}>
                                <svg className={styles.volumeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-volume"/>
                                </svg>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                defaultValue="0.7"
                                className={styles.volumeLine}
                                onChange={handleVolume}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}