import styles from "./page.module.css";

import CenterBlock from "@components/CenterBlock/CenterBlock";
import Sidebar from "@components/Sidebar/Sidebar";
import Bar from "@components/Bar/Bar";
import Nav from "@components/Nav/Nav";

export default function Home() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <Nav />
                    <CenterBlock />
                    <Sidebar />
                </main>

                <Bar />
            </div>
        </div>
    );
}
