"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./nav.module.css";
import React from "react";

export default function Nav() {
    const [isOpen, setIsOpen] = React.useState(false);

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
                className={`${styles.burger} ${isOpen ? styles.burgerActive : ''}`}
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
                    <li className={styles.menuItem}>
                        <Link href="../signin.html" className={styles.menuLink}>Войти</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}