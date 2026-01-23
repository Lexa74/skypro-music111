"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {hydrateFromStorage, setHydrated} from "@/store/features/userSlice";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hydrateFromStorage());
        dispatch(setHydrated(true));
    }, [dispatch]);

    return null;
}