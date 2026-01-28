"use client";

import { useEffect } from "react";
import CenterBlock from "@components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadFavorites } from "@/store/features/trackSlice";

export default function Favorites() {
    const dispatch = useAppDispatch();
    const { likedTracks, error } = useAppSelector((state) => state.tracks);

    useEffect(() => {
        dispatch(loadFavorites());
    }, [dispatch]);

    return <CenterBlock tracks={likedTracks} title="Избранные треки" isLoading={!likedTracks.length && !error} />;
}