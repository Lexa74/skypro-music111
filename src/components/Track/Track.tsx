"use client";

import Link from "next/link";
import styles from "./track.module.css";
import { formatTime } from "@utils/helper";
import { Track as TrackType } from "@/sharedTypes/track";
import { setCurrentTrack } from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import classNames from "classnames";
import {useCallback, useMemo} from "react";

type Props = {
    track: TrackType;
};

export default function Track({ track }: Props) {
    const dispatch = useAppDispatch();
    const { currentTrack, isPlaying } = useAppSelector(state => state.tracks);

    const isActive = useMemo(() => currentTrack?._id === track._id && isPlaying, [currentTrack?._id, track._id, isPlaying]);
    const isPlayingNow = isActive && isPlaying;

    const onSelect = useCallback(() => {
        dispatch(setCurrentTrack(track));
    }, [dispatch, track]);

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
                    {formatTime(track.duration_in_seconds)}
                </div>
            </div>
        </div>
    );
}
