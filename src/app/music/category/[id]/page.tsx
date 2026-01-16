"use client"

import {useParams} from "next/navigation";

export default function CategoryPage() {
    const params = useParams<{ id: string }>();

    return (
        <div>Категория {params.id}</div>
    )

}