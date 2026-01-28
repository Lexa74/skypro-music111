"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {hydrateFromStorage, setHydrated} from "@/store/features/userSlice";
import {loadFavorites, loadTracks} from "@/store/features/trackSlice";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hydrateFromStorage());
        dispatch(setHydrated(true));
        dispatch(loadFavorites());
        dispatch(loadTracks());
    }, [dispatch]);

    return null;
}