"use client"

import styles from './signup.module.css'
import classNames from "classnames";
import Link from "next/link";
import {useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import {getToken, login, signup} from "@/service/authApi";
import {setTokens, setUser} from "@/store/features/userSlice";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== repeatPassword) {
            setError("Пароли не совпадают");
            return;
        }

        setLoading(true);

        try {
            await signup(email, password || email.split("@")[0]);
            const user = await login(email, password);
            const {access, refresh} = await getToken(email, password);

            dispatch(setUser(user));
            dispatch(setTokens({access, refresh}));

            window.location.href = "/music/main";
        } catch (err: any) {
            setError(err.message || "Ошибка регистрации");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.modal__form} onSubmit={handleSubmit}>
            <Link href="/music/main">
                <div className={styles.modal__logo}>
                    <img src="/img/logo_modal.png" alt="logo"/>
                </div>
            </Link>

            <input
                className={classNames(styles.modal__input, styles.login)}
                type="email"
                placeholder="Почта"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                required
            />

            <input
                className={styles.modal__input}
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <input
                className={styles.modal__input}
                type="password"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
            />

            <div className={styles.errorContainer}>
                {error && <span className={styles.errorText}>{error}</span>}
            </div>

            <button
                className={styles.modal__btnSignupEnt}
                type="submit"
                disabled={loading}
            >
                {loading ? "Регистрируем..." : "Зарегистрироваться"}
            </button>
        </form>
    );
}