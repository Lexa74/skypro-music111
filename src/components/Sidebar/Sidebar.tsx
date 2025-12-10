import Image from "next/image";
import Link from "next/link";
import styles from "./sidebar.module.css";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            {/* PERSONAL BLOCK */}
            <div className={styles.personal}>
                <p className={styles.personalName}>Sergey.Ivanov</p>

                <div className={styles.icon}>
                    <svg>
                        <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                    </svg>
                </div>
            </div>

            {/* PLAYLIST BLOCK */}
            <div className={styles.block}>
                <div className={styles.list}>

                    {/* CARD 1 */}
                    <div className={styles.item}>
                        <Link className={styles.link} href="#">
                            <Image
                                className={styles.img}
                                src="/img/playlist01.png"
                                alt="playlist"
                                width={250}
                                height={170}
                            />
                        </Link>
                    </div>

                    {/* CARD 2 */}
                    <div className={styles.item}>
                        <Link className={styles.link} href="#">
                            <Image
                                className={styles.img}
                                src="/img/playlist02.png"
                                alt="playlist"
                                width={250}
                                height={170}
                            />
                        </Link>
                    </div>

                    {/* CARD 3 */}
                    <div className={styles.item}>
                        <Link className={styles.link} href="#">
                            <Image
                                className={styles.img}
                                src="/img/playlist03.png"
                                alt="playlist"
                                width={250}
                                height={170}
                            />
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
