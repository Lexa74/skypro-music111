const API_BASE = "https://webdev-music-003b5b991590.herokuapp.com/user/";

export const signup = async (email: string, password: string) => {
    const username = email.split('@')[0];

    const response = await fetch(`${API_BASE}signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(
            errData.message ||
            errData.detail ||
            `Ошибка ${response.status}`
        );
    }

    return response.json();
};

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}login/`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 400 || response.status === 401) {
        const data = await response.json();
        throw new Error(data.message || "Неверные учетные данные");
    } else {
        throw new Error("Проверьте логин или пароль");
    }
};

export const getToken = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}token/`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 400 || response.status === 401) {
        const data = await response.json();
        throw new Error(data.message || "Token retrieval failed");
    } else {
        throw new Error("Server error");
    }
};

export const refreshToken = async (refresh: string) => {
    const response = await fetch(`${API_BASE}token/refresh/`, {
        method: "POST",
        body: JSON.stringify({ refresh }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 401) {
        const data = await response.json();
        throw new Error(data.detail || "Invalid refresh token");
    } else {
        throw new Error("Server error");
    }
};