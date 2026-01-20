"use client";

import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./nav.module.css";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import { useState, useEffect } from "react";
import {logout} from "@/store/features/userSlice";

export default function Nav() {
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const [mounted, setMounted] = useState(false);
    const isAuthenticated = useAppSelector((state) => !!state.user.user);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
        router.replace('/auth/signin/');
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Image
                    width={250}
                    height={150}
                    className={styles.logoImage}
                    src="/img/logo.png"
                    alt="logo"
                />
            </div>

            <div
                className={styles.burger}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
            </div>

            <div className={`${styles.menuWrapper} ${isOpen ? styles.menuWrapperOpen : ''}`}>
                <ul className={styles.menuList}>
                    <li className={styles.menuItem}>
                        <Link href="#" className={styles.menuLink}>Главное</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="#" className={styles.menuLink}>Мой плейлист</Link>
                    </li>
                    {mounted && (
                        <li className={styles.menuItem}>
                            {isAuthenticated ? (
                                <button
                                    type="button"
                                    className={styles.menuLink}
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </button>
                            ) : (
                                <Link
                                    href="/auth/signin"
                                    className={styles.menuLink}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Войти
                                </Link>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}