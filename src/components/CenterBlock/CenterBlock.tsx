import styles from "./centerblock.module.css";
import Search from "@components/Search/Search";
import Filter from "@components/Filter/Filter";
import Track from "@components/Track/Track";
import {Track as TrackType} from "@/sharedTypes/track";
import {useEffect, useMemo, useState} from "react";

interface CenterBlockProps {
    tracks: TrackType[];
    title?: string;
    isLoading?: boolean;
}

export default function CenterBlock( {tracks, title = "Треки", isLoading = false}: CenterBlockProps ) {
    const safeTracks = Array.isArray(tracks) ? tracks : [];

    const [searchValue, setSearchValue] = useState("");
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedYearId, setSelectedYearId] = useState<string | null>(null);

    const filteredTracks = useMemo(() => {
        let result = safeTracks;

        const q = searchValue.trim().toLowerCase();
        if (q) {
            result = result.filter((track) =>
                (track.name ?? "").toLowerCase().startsWith(q)
            );
        }

        if (selectedAuthors.length > 0) {
            result = result.filter((track) =>
                track.author ? selectedAuthors.includes(track.author) : false
            );
        }

        if (selectedGenres.length > 0) {
            result = result.filter((track) => {
                const genres = track.genre ?? [];
                return genres.some((g) => selectedGenres.includes(g));
            });
        }

        if (selectedYearId) {
            result = [...result].sort((a, b) => {
                const dateA = new Date(a.release_date).getTime();
                const dateB = new Date(b.release_date).getTime();
                return selectedYearId === "new" ? dateB - dateA : dateA - dateB;
            });
        }

        return result;
    }, [safeTracks, searchValue, selectedAuthors, selectedGenres, selectedYearId]);

    const handleAuthorToggle = (author: string) => {
        setSelectedAuthors((prev) =>
            prev.includes(author)
                ? prev.filter((a) => a !== author)
                : [...prev, author]
        );
    };

    const handleGenreToggle = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const handleYearSelect = (id: string) => {
        setSelectedYearId((prev) => (prev === id ? null : id));
    };

    return (
        <section className={styles.centerblock}>
            <Search value={searchValue} onChange={setSearchValue}/>

            <h2 className={styles.title}>
                {isLoading ? title || "..." : title}
            </h2>

            <Filter tracks={safeTracks}
                    selectedAuthors={selectedAuthors}
                    onAuthorToggle={handleAuthorToggle}
                    selectedGenres={selectedGenres}
                    onGenreToggle={handleGenreToggle}
                    selectedYearId={selectedYearId}
                    onYearSelect={handleYearSelect}
            />

            <div className={styles.content}>
                <div className={styles.contentTitle}>
                    <div className={`${styles.playlistCol} ${styles.col01}`}>Трек</div>
                    <div className={`${styles.playlistCol} ${styles.col02}`}>Исполнитель</div>
                    <div className={`${styles.playlistCol} ${styles.col03}`}>Альбом</div>
                    <div className={`${styles.playlistCol} ${styles.col04}`}>
                        <svg className={styles.playlistColSvg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                        </svg>
                    </div>
                </div>

                <div className={styles.playlist}>
                    {isLoading ? (
                        <div className={styles.tracks_notFound}>Загрузка треков...</div>
                    ) : safeTracks.length === 0 ? (
                        <div className={styles.tracks_notFound}>Треков пока нет</div>
                    ) : filteredTracks.length === 0 ? (
                        <div className={styles.tracks_notFound}>Нет подходящих треков</div>
                    ) : (
                        filteredTracks.map((track) => <Track key={track._id} track={track} />)
                    )}
                </div>
            </div>
        </section>
    );
}
