import Nav from "@components/Nav/Nav";
import Sidebar from "@components/Sidebar/Sidebar";
import Bar from "@components/Bar/Bar";
import styles from "@/app/music/main/page.module.css";
import React from "react";

export default function MusicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <Nav />
                    {children}
                    <Sidebar />
                </main>
                <Bar />
            </div>
        </div>
    );
}