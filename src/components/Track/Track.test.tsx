import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Track from "./Track";
import type { Track as TrackType } from "@/sharedTypes/track";

jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ href, children, ...rest }: any) => (
        <a href={href} {...rest}>
            {children}
        </a>
    ),
}));

jest.mock("@utils/helper", () => ({
    formatTime: (n: number) => `t:${n}`,
}));

const dispatchMock = jest.fn();
let mockState: any;

jest.mock("@/store/hooks", () => ({
    useAppDispatch: () => dispatchMock,
    useAppSelector: (selector: any) => selector(mockState),
}));

const setCurrentTrackMock = jest.fn((payload) => ({ type: "tracks/setCurrentTrack", payload }));
const toggleTrackLikeMock = jest.fn((payload) => ({ type: "tracks/toggleTrackLike", payload }));

jest.mock("@/store/features/trackSlice", () => ({
    setCurrentTrack: (payload: any) => setCurrentTrackMock(payload),
    toggleTrackLike: (payload: any) => toggleTrackLikeMock(payload),
}));

const createTrack = (overrides: Partial<TrackType> = {}): TrackType => ({
    _id: 1,
    name: "Song 1",
    author: "Author 1",
    album: "Album 1",
    genre: ["rock"],
    release_date: "2020-01-01T00:00:00.000Z",
    track_file: "u1",
    duration_in_seconds: 180,
    logo: null,
    stared_user: [],
    ...overrides,
});

beforeEach(() => {
    jest.clearAllMocks();

    mockState = {
        user: { user: { _id: 777 } },
        tracks: {
            currentTrack: null,
            isPlaying: false,
            likedIds: [] as number[],
        },
    };
});

describe("Track", () => {
    test("рендерит имя, автора, альбом и время", () => {
        const track = createTrack({ name: "Hello", author: "A", album: "B", duration_in_seconds: 42 });

        render(<Track track={track} />);

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("A")).toBeInTheDocument();
        expect(screen.getByText("B")).toBeInTheDocument();
        expect(screen.getByText("t:42")).toBeInTheDocument();
    });

    test("не активный трек показывает icon-note", () => {
        const track = createTrack({ _id: 1 });
        mockState.tracks.currentTrack = createTrack({ _id: 2 });
        mockState.tracks.isPlaying = true;

        const { container } = render(<Track track={track} />);

        const useEl = container.querySelector('use[xlink\\:href="/img/icon/sprite.svg#icon-note"]');
        expect(useEl).toBeTruthy();
    });

    test("если текущий трек совпадает и isPlaying=true — dot с pulse", () => {
        const track = createTrack({ _id: 1 });
        mockState.tracks.currentTrack = createTrack({ _id: 1 });
        mockState.tracks.isPlaying = true;

        const { container } = render(<Track track={track} />);

        const dot = container.querySelector("div.dot") as HTMLDivElement;
        expect(dot).toBeTruthy();
        expect(dot.className).toContain("pulse");
    });

    test("клик по карточке трека диспатчит setCurrentTrack(track)", () => {
        const track = createTrack({ _id: 77 });

        const { container } = render(<Track track={track} />);

        const root = container.querySelector("div.item") as HTMLDivElement;
        fireEvent.click(root);

        expect(setCurrentTrackMock).toHaveBeenCalledWith(track);
        expect(dispatchMock).toHaveBeenCalledWith({ type: "tracks/setCurrentTrack", payload: track });
    });

    test("клик по like не выбирает трек (stopPropagation) и диспатчит toggleTrackLike(track._id)", () => {
        const track = createTrack({ _id: 1 });

        const { container } = render(<Track track={track} />);

        const likeBtn = container.querySelector("button.like") as HTMLButtonElement;
        fireEvent.click(likeBtn);

        expect(toggleTrackLikeMock).toHaveBeenCalledWith(1);
        expect(dispatchMock).toHaveBeenCalledWith({ type: "tracks/toggleTrackLike", payload: 1 });

        expect(setCurrentTrackMock).not.toHaveBeenCalled();
    });

    test("если трек лайкнут — svg залит фиолетовым", () => {
        const track = createTrack({ _id: 1 });
        mockState.tracks.likedIds = [1];

        const { container } = render(<Track track={track} />);

        const svg = container.querySelector("svg.likeSvg") as SVGElement;
        expect(svg).toHaveStyle({ fill: "#b672ff", stroke: "#b672ff" });
    });
});
