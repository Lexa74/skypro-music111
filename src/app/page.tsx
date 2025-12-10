import "./page.css";
import CenterBlock from "@components/CenterBlock/CenterBlock";
import Sidebar from "@components/Sidebar/Sidebar";
import Bar from "@components/Bar/Bar";
import Nav from "@components/Nav/Nav";

export default function Home() {
    return (
        <div className="wrapper">
            <div className="container">
                <main className="main">
                    <Nav />
                    <CenterBlock />
                    <Sidebar />
                </main>

                <Bar />
            </div>
        </div>
    );
}
