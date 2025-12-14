import Link from "next/link";
import styles from "./track.module.css";
import { formatTime } from "@utils/helper";
import { Track as TrackType } from "@/sharedTypes/track";

type Props = {
    track: TrackType;
};

export default function Track({ track }: Props) {
    return (
        <div className={styles.item}>
            <div className={styles.track}>
                <div className={styles.title}>
                    <div className={styles.image}>
                        <svg className={styles.svg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                    </div>

                    <Link href="#" className={styles.name}>
                        {track.name}
                    </Link>
                </div>

                <div className={styles.author}>
                    <Link href="#">{track.author}</Link>
                </div>

                <div className={styles.album}>
                    <Link href="#">{track.album}</Link>
                </div>

                <div className={styles.time}>
                    {formatTime(track.duration_in_seconds)}
                </div>
            </div>
        </div>
    );
}
