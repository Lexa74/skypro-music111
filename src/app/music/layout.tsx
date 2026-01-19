"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function MusicLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const isAuth = useAppSelector(state => !!state.user.accessToken || !!state.user.refreshToken);

    useEffect(() => {
        if (!isAuth) {
            router.replace("/auth/signin");
        }
    }, [isAuth, router]);

    if (!isAuth) return null;

    return <>{children}</>;
}