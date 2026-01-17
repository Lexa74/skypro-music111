"use client"

import styles from "./page.module.css";

import CenterBlock from "@components/CenterBlock/CenterBlock";
import Sidebar from "@components/Sidebar/Sidebar";
import Bar from "@components/Bar/Bar";
import Nav from "@components/Nav/Nav";
import {useEffect, useState} from "react";
import {getTracks} from "@/service/tarckApi";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setTracks} from "@/store/features/trackSlice"


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const tracks = useAppSelector(state => state.tracks.tracks)

    useEffect(() => {
        let mounted = true;

        getTracks().then((data) => {
            if (!mounted) return
            dispatch(setTracks(data))
            setLoading(false);
        })
            .catch((err) => {
                if (!mounted) return
                setError(err.message || "Не удалось загрузить список треков");
                setLoading(false);
            })

        return () => {
            mounted = false;
        };
    }, [dispatch]);


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <Nav/>

                    {loading && (
                        <div className={styles.center}>Загрузка списка треков...</div>
                    )}

                    {error && (
                        <div className={styles.center} style={{color: "#ffffff"}}>
                            Ошибка загрузки: {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <CenterBlock tracks={tracks}/>
                    )}

                    <Sidebar/>
                </main>

                <Bar/>
            </div>
        </div>
    );
}
