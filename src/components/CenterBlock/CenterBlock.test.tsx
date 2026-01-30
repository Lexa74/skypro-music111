import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CenterBlock from "./CenterBlock";

jest.mock("@components/Search/Search", () => ({
    __esModule: true,
    default: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
        <div>
            <label htmlFor="search">search</label>
            <input
                id="search"
                aria-label="search"
                value={value}
                onChange={(e) => onChange((e.target as HTMLInputElement).value)}
            />
        </div>
    ),
}));

jest.mock("@components/Track/Track", () => ({
    __esModule: true,
    default: ({ track }: any) => (
        <div data-testid="track-row">
            {track._id}:{track.author}:{track.name}
        </div>
    ),
}));

jest.mock("@components/Filter/Filter", () => ({
    __esModule: true,
    default: ({
                  tracks,
                  onAuthorToggle,
                  onGenreToggle,
                  onYearSelect,
              }: any) => (
        <div>
            <div data-testid="filter-tracks-len">{tracks?.length ?? "?"}</div>

            <button onClick={() => onAuthorToggle("Author 1")}>toggle-author-1</button>
            <button onClick={() => onGenreToggle("rock")}>toggle-genre-rock</button>

            <button onClick={() => onYearSelect("new")}>year-new</button>
            <button onClick={() => onYearSelect("old")}>year-old</button>
        </div>
    ),
}));

const t = (overrides: Partial<any>) => ({
    _id: overrides._id ?? "id",
    name: overrides.name ?? "Song",
    author: overrides.author ?? "Author",
    album: overrides.album ?? "Album",
    genre: overrides.genre ?? [],
    release_date: overrides.release_date ?? "2020-01-01T00:00:00.000Z",
    track_file: overrides.track_file ?? "u",
    duration_in_seconds: 180,
    logo: null,
    stared_user: [],
});

describe("CenterBlock", () => {
    test("показывает 'Загрузка треков...' при isLoading=true", () => {
        render(<CenterBlock tracks={[t({ _id: "1" })]} isLoading title="Треки" />);
        expect(screen.getByText("Загрузка треков...")).toBeInTheDocument();
    });

    test("показывает 'Треков пока нет' если tracks пустой", () => {
        render(<CenterBlock tracks={[]} />);
        expect(screen.getByText("Треков пока нет")).toBeInTheDocument();
    });

    test("поиск: фильтрует по startsWith (без учета регистра)", () => {
        const tracks = [
            t({ _id: "1", name: "Hello", author: "Author 1" }),
            t({ _id: "2", name: "World", author: "Author 2" }),
            t({ _id: "3", name: "heaven", author: "Author 3" }),
        ];

        render(<CenterBlock tracks={tracks} />);

        const input = screen.getByLabelText("search");
        fireEvent.change(input, { target: { value: "he" } });

        const rows = screen.getAllByTestId("track-row").map((n) => n.textContent);
        expect(rows).toHaveLength(2);
        expect(rows[0]).toContain("Hello");
        expect(rows[1]).toContain("heaven");
    });

    test("фильтр по автору: оставляет только выбранного автора", () => {
        const tracks = [
            t({ _id: "1", name: "A", author: "Author 1" }),
            t({ _id: "2", name: "B", author: "Author 2" }),
        ];

        render(<CenterBlock tracks={tracks} />);

        fireEvent.click(screen.getByText("toggle-author-1"));

        const rows = screen.getAllByTestId("track-row").map((n) => n.textContent);
        expect(rows).toHaveLength(1);
        expect(rows[0]).toContain("Author 1");
    });

    test("фильтр по жанру: оставляет треки где genre содержит выбранный жанр", () => {
        const tracks = [
            t({ _id: "1", name: "A", genre: ["rock"] }),
            t({ _id: "2", name: "B", genre: ["pop"] }),
            t({ _id: "3", name: "C", genre: ["indie", "rock"] }),
        ];

        render(<CenterBlock tracks={tracks} />);

        fireEvent.click(screen.getByText("toggle-genre-rock"));

        const rows = screen.getAllByTestId("track-row").map((n) => n.textContent);
        expect(rows).toHaveLength(2);
        expect(rows[0]).toContain("1:");
        expect(rows[1]).toContain("3:");
    });

    test("сортировка по году: new сортирует по release_date по убыванию", () => {
        const tracks = [
            t({ _id: "1", name: "Old", release_date: "2020-01-01T00:00:00.000Z" }),
            t({ _id: "2", name: "New", release_date: "2024-01-01T00:00:00.000Z" }),
            t({ _id: "3", name: "Mid", release_date: "2022-01-01T00:00:00.000Z" }),
        ];

        render(<CenterBlock tracks={tracks} />);

        fireEvent.click(screen.getByText("year-new"));

        const rows = screen.getAllByTestId("track-row").map((n) => n.textContent);
        expect(rows[0]).toContain("2:");
        expect(rows[1]).toContain("3:");
        expect(rows[2]).toContain("1:");
    });

    test("если после фильтров ничего нет — показывает 'Нет подходящих треков'", () => {
        const tracks = [t({ _id: "1", name: "Alpha", author: "Author 2" })];

        render(<CenterBlock tracks={tracks} />);

        fireEvent.click(screen.getByText("toggle-author-1"));
        expect(screen.getByText("Нет подходящих треков")).toBeInTheDocument();
    });

    test("Filter получает tracks именно из safeTracks (не отфильтрованные)", () => {
        const tracks = [
            t({ _id: "1", name: "Hello", author: "Author 1" }),
            t({ _id: "2", name: "World", author: "Author 2" }),
        ];

        render(<CenterBlock tracks={tracks} />);

        expect(screen.getByTestId("filter-tracks-len").textContent).toBe("2");

        fireEvent.change(screen.getByLabelText("search"), { target: { value: "he" } });
        expect(screen.getByTestId("filter-tracks-len").textContent).toBe("2");
    });
});
