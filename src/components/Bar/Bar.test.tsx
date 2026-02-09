import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Bar, { shuffleArray } from "./Bar";

const dispatchMock = jest.fn();

let mockState: any;

jest.mock("@/store/hooks", () => ({
    useAppDispatch: () => dispatchMock,
    useAppSelector: (selector: any) => selector(mockState),
}));

const setCurrentTrackMock = jest.fn((payload) => ({ type: "tracks/setCurrentTrack", payload }));
const setIsPlayingMock = jest.fn((payload) => ({ type: "tracks/setIsPlaying", payload }));
const toggleRepeatMock = jest.fn(() => ({ type: "tracks/toggleRepeat" }));
const toggleShuffleMock = jest.fn(() => ({ type: "tracks/toggleShuffle" }));
const toggleTrackLikeMock = jest.fn((payload) => ({ type: "tracks/toggleTrackLike", payload }));

jest.mock("@/store/features/trackSlice", () => ({
    setCurrentTrack: (payload: any) => setCurrentTrackMock(payload),
    setIsPlaying: (payload: any) => setIsPlayingMock(payload),
    toggleRepeat: () => toggleRepeatMock(),
    toggleShuffle: () => toggleShuffleMock(),
    toggleTrackLike: (payload: any) => toggleTrackLikeMock(payload),
}));

jest.mock("@utils/helper", () => ({
    formatTime: (n: number) => `t:${Math.floor(n)}`,
}));

beforeAll(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
        configurable: true,
        value: jest.fn().mockResolvedValue(undefined),
    });
    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
        configurable: true,
        value: jest.fn(),
    });
});

beforeEach(() => {
    jest.clearAllMocks();
    mockState = {
        tracks: {
            currentTrack: null,
            isPlaying: false,
            isRepeat: false,
            isShuffle: false,
            tracks: [],
            likedIds: [],
        },
    };
});

describe("shuffleArray", () => {
    test("возвращает новый массив (не мутирует исходный)", () => {
        const src = [1, 2, 3, 4];
        const out = shuffleArray(src);
        expect(out).not.toBe(src);
        expect(src).toEqual([1, 2, 3, 4]);
        expect(out.sort()).toEqual([1, 2, 3, 4]);
    });

    test("детерминированно перемешивает при замоканном Math.random", () => {
        const rnd = jest.spyOn(Math, "random").mockReturnValue(0); // всегда 0
        const out = shuffleArray([1, 2, 3, 4]);
        expect(out).toEqual([2, 3, 4, 1]);
        rnd.mockRestore();
    });
});

describe("Bar", () => {
    test("возвращает null, если currentTrack отсутствует", () => {
        const { container } = render(<Bar />);
        expect(container).toBeEmptyDOMElement();
    });

    test("рендерит автора и название трека, если currentTrack есть", () => {
        mockState.tracks.currentTrack = {
            _id: "t1",
            author: "Author 1",
            name: "Song 1",
            track_file: "https://example.com/a.mp3",
        };
        mockState.tracks.tracks = [mockState.tracks.currentTrack];

        render(<Bar />);
        expect(screen.getByText("Author 1")).toBeInTheDocument();
        expect(screen.getByText("Song 1")).toBeInTheDocument();
    });

    test("клик play/pause диспатчит setIsPlaying с инверсией текущего значения", () => {
        mockState.tracks.currentTrack = {
            _id: "t1",
            author: "Author 1",
            name: "Song 1",
            track_file: "https://example.com/a.mp3",
        };
        mockState.tracks.tracks = [mockState.tracks.currentTrack];
        mockState.tracks.isPlaying = false;

        const { container } = render(<Bar />);

        const playBtn = container.querySelector("button.btnPlay") as HTMLButtonElement;
        expect(playBtn).toBeTruthy();

        fireEvent.click(playBtn);

        expect(setIsPlayingMock).toHaveBeenCalledWith(true);
        expect(dispatchMock).toHaveBeenCalledWith({ type: "tracks/setIsPlaying", payload: true });
    });

    test("next/prev диспатчат setCurrentTrack на следующий/предыдущий в плейлисте", () => {
        const t1 = { _id: "t1", author: "A1", name: "S1", track_file: "u1" };
        const t2 = { _id: "t2", author: "A2", name: "S2", track_file: "u2" };
        const t3 = { _id: "t3", author: "A3", name: "S3", track_file: "u3" };

        mockState.tracks.currentTrack = t2;
        mockState.tracks.tracks = [t1, t2, t3];
        mockState.tracks.isShuffle = false;

        const { container } = render(<Bar />);

        const nextBtn = container.querySelector("button.btnNext") as HTMLButtonElement;
        const prevBtn = container.querySelector("button.btnPrev") as HTMLButtonElement;

        fireEvent.click(nextBtn);
        expect(setCurrentTrackMock).toHaveBeenLastCalledWith(t3);

        fireEvent.click(prevBtn);
        expect(setCurrentTrackMock).toHaveBeenLastCalledWith(t1);
    });

    test("repeat/shuffle кнопки диспатчат toggleRepeat/toggleShuffle", () => {
        mockState.tracks.currentTrack = {
            _id: "t1",
            author: "A1",
            name: "S1",
            track_file: "u1",
        };
        mockState.tracks.tracks = [mockState.tracks.currentTrack];

        const { container } = render(<Bar />);

        const repeatBtn = container.querySelector("button.btnRepeat") as HTMLButtonElement;
        const shuffleBtn = container.querySelector("button.btnShuffle") as HTMLButtonElement;

        fireEvent.click(repeatBtn);
        expect(dispatchMock).toHaveBeenCalledWith({ type: "tracks/toggleRepeat" });

        fireEvent.click(shuffleBtn);
        expect(dispatchMock).toHaveBeenCalledWith({ type: "tracks/toggleShuffle" });
    });

    test("like диспатчит toggleTrackLike(currentTrack._id)", () => {
        mockState.tracks.currentTrack = {
            _id: "t1",
            author: "A1",
            name: "S1",
            track_file: "u1",
        };
        mockState.tracks.tracks = [mockState.tracks.currentTrack];
        mockState.tracks.likedIds = [];

        const { container } = render(<Bar />);

        const likeBtn = container.querySelector("button.like") as HTMLButtonElement;
        fireEvent.click(likeBtn);

        expect(toggleTrackLikeMock).toHaveBeenCalledWith("t1");
        expect(dispatchMock).toHaveBeenCalledWith({ type: "tracks/toggleTrackLike", payload: "t1" });
    });

    test("перемотка (progress slider) меняет audio.currentTime", () => {
        mockState.tracks.currentTrack = {
            _id: "t1",
            author: "A1",
            name: "S1",
            track_file: "u1",
        };
        mockState.tracks.tracks = [mockState.tracks.currentTrack];

        const { container } = render(<Bar />);

        const audio = container.querySelector("audio") as HTMLAudioElement;
        expect(audio).toBeTruthy();

        Object.defineProperty(audio, "duration", {
            configurable: true,
            value: 100,
        });
        fireEvent(audio, new Event("loadedmetadata"));

        const sliders = screen.getAllByRole("slider");
        const progressSlider = sliders[0]; // первый — прогресс

        fireEvent.change(progressSlider, { target: { value: "10" } });

        expect(audio.currentTime).toBe(10);
    });


    test("громкость (volume slider) меняет audio.volume", () => {
        mockState.tracks.currentTrack = {
            _id: "t1",
            author: "A1",
            name: "S1",
            track_file: "u1",
        };
        mockState.tracks.tracks = [mockState.tracks.currentTrack];

        const { container } = render(<Bar />);
        const audio = container.querySelector("audio") as HTMLAudioElement;

        const sliders = screen.getAllByRole("slider");
        const volumeSlider = sliders[1];

        fireEvent.change(volumeSlider, { target: { value: "0.25" } });
        expect(audio.volume).toBeCloseTo(0.25);
    });
});
