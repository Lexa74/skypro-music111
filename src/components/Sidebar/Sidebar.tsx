"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./sidebar.module.css";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {logout} from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";


export default function Sidebar() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const username = useAppSelector(state => state.user.user?.username);
    const [displayName, setDisplayName] = useState("Гость");

    useEffect(() => {
        if (username) {
            setDisplayName(username);
        }
    }, [username]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        router.replace("/auth/signin");
    };


    return (
        <div className={styles.sidebar}>

            {/* PERSONAL BLOCK */}
            <div className={styles.personal}>
                <p className={styles.personalName} suppressHydrationWarning>{displayName}</p>

                <button
                    className={styles.icon}
                    onClick={handleLogout}
                    title="Выйти"
                    aria-label="Выйти из аккаунта"
                >
                    <svg>
                        <use xlinkHref="/img/icon/sprite.svg#logout" />
                    </svg>
                </button>
            </div>

            {/* PLAYLIST BLOCK */}
            <div className={styles.block}>
                <div className={styles.list}>

                    {/* CARD 1 */}
                    <div className={styles.item}>
                        <Link className={styles.link} href="/music/category/2">
                            <Image
                                className={styles.img}
                                src="/img/playlist01.png"
                                alt="playlist"
                                width={250}
                                height={150}
                            />
                        </Link>
                    </div>

                    {/* CARD 2 */}
                    <div className={styles.item}>
                        <Link className={styles.link} href="/music/category/3">
                            <Image
                                className={styles.img}
                                src="/img/playlist02.png"
                                alt="playlist"
                                width={250}
                                height={150}
                            />
                        </Link>
                    </div>

                    {/* CARD 3 */}
                    <div className={styles.item}>
                        <Link className={styles.link} href="/music/category/4">
                            <Image
                                className={styles.img}
                                src="/img/playlist03.png"
                                alt="playlist"
                                width={250}
                                height={150}
                            />
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
