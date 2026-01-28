"use client";

import Link from "next/link";
import styles from "./track.module.css";
import { formatTime } from "@utils/helper";
import { Track as TrackType } from "@/sharedTypes/track";
import {setCurrentTrack, toggleTrackLike} from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import classNames from "classnames";
import React, {useCallback, useMemo} from "react";

type Props = {
    track: TrackType;
};

export default function Track({ track }: Props) {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.user.user?._id ?? 0);
    const { currentTrack, isPlaying } = useAppSelector(state => state.tracks);

    const isActive = useMemo(() => currentTrack?._id === track._id && isPlaying, [currentTrack?._id, track._id, isPlaying]);
    const isPlayingNow = isActive && isPlaying;

    const onSelect = useCallback(() => {
        dispatch(setCurrentTrack(track));
    }, [dispatch, track]);

    const isLiked = useAppSelector((state) => state.tracks.likedIds.includes(track._id));

    const handleLikeClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            dispatch(toggleTrackLike(track._id));
        },
        [dispatch, track._id]
    );

    return (
        <div
            className={styles.item} onClick={onSelect}>
            <div className={styles.track}>
                <div className={styles.title}>
                    <div className={styles.image}>

                        {isActive ? (
                            <div className={classNames(styles.dot, { [styles.pulse]: isPlayingNow })} />
                        ) : (
                            <svg className={styles.svg}>
                                <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                            </svg>
                        )}
                    </div>

                    <Link href="#" className={styles.name}>
                        {track.name}
                    </Link>
                </div>

                <div className={styles.author}>{track.author}</div>
                <div className={styles.album}>{track.album}</div>
                <div className={styles.time}>
                    <button className={styles.like} onClick={handleLikeClick} type="button">
                        <svg
                            className={styles.likeSvg}
                            style={{
                                fill: isLiked ? "#b672ff" : "transparent",
                                stroke: isLiked ? "#b672ff" : "#696969",
                            }}
                        >
                            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                        </svg>
                    </button>
                    <span className={styles.timeText}>{formatTime(track.duration_in_seconds)}</span>
                </div>
            </div>
        </div>
    );
}
