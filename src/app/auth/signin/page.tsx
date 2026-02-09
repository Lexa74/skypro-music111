"use client"

import {useRouter} from "next/navigation";
import styles from './signin.module.css'
import classNames from "classnames";
import Link from "next/link";
import { login, getToken } from "@/service/authApi";
import React, {useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import {setTokens, setUser} from "@/store/features/userSlice";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const user = await login(email, password);
            const tokens = await getToken(email, password);

            dispatch(setUser(user));
            dispatch(setTokens(tokens));

            setTimeout(() => {
                router.replace("/music/main");
            }, 300);
        } catch (err: any) {
            setError(err.message || "Ошибка входа. Проверьте данные.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.modal__form} onSubmit={handleSubmit}>
            <Link href="/music/main">
                <div className={styles.modal__logo}>
                    <img src="/img/logo_modal.png" alt="logo" />
                </div>
            </Link>

            <input
                className={classNames(styles.modal__input, styles.login)}
                type="email"
                name="email"
                placeholder="Почта"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                required
            />

            <input
                className={styles.modal__input}
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <div className={styles.errorContainer}>
                {error && <span className={styles.errorText}>{error}</span>}
            </div>

            <button
                className={styles.modal__btnEnter}
                type="submit"
                disabled={loading}
            >
                {loading ? "Входим..." : "Войти"}
            </button>

            <Link href="/auth/signup" className={styles.modal__btnSignup}>
                Зарегистрироваться
            </Link>
        </form>
    );
}