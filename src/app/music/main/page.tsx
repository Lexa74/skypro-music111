"use client";

import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useEffect, useState } from "react";
import { getTracks } from "@/service/trackApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {setTracks} from "@/store/features/trackSlice";

export default function MainPage() {
    const [loading, setLoading] = useState(true);
    const tracks = useAppSelector(state => state.tracks.tracks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getTracks().then(data => {
            dispatch(setTracks(data));
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [dispatch]);

    return (
        <CenterBlock
            tracks={tracks}
            title="Треки"
            isLoading={loading}
        />
    );
}