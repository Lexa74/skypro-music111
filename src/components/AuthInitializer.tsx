"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setTokens } from "@/store/features/userSlice";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const access = localStorage.getItem("accessToken");
        const refresh = localStorage.getItem("refreshToken");

        if (access && refresh) {
            dispatch(setTokens({ access, refresh }));
        }
    }, [dispatch]);

    return null;
}