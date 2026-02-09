import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "@/sharedTypes/track";
import {RootState} from "@/store/store";
import {addFavorite, getFavorites, getTracks, removeFavorite} from "@/service/trackApi";

type initialStateType = {
    currentTrack: null | Track;
    isPlaying: boolean;
    isRepeat: boolean;
    isShuffle: boolean;
    likedTracks: Track[];
    likedIds: number[];
    tracks: Track[];
    error: string | null;
}

const initialState: initialStateType = {
    currentTrack: null,
    isPlaying: false,
    isRepeat: false,
    isShuffle: false,
    likedTracks: [],
    likedIds: [],


    tracks: [],
    error: null,
}

export const loadTracks = createAsyncThunk("tracks/loadTracks", async () => {
    return await getTracks();
});

export const loadFavorites = createAsyncThunk("tracks/loadFavorites", async (_, {getState, rejectWithValue}) => {
    const state = getState() as RootState;
    const token = state.user.accessToken;
    if (!token) return rejectWithValue("No token");
    return await getFavorites(token);
});

export const toggleTrackLike = createAsyncThunk(
    "tracks/toggleTrackLike",
    async (id: number, {getState, rejectWithValue}) => {
        const state = getState() as RootState;
        const token = state.user.accessToken;
        const userId = state.user.user?._id ?? 0;
        if (!token || !userId) return rejectWithValue("No auth");

        const track =
            state.tracks.tracks.find((t) => t._id === id) ??
            state.tracks.likedTracks.find((t) => t._id === id);

        if (!track) return rejectWithValue("Track not found");

        const isLiked = state.tracks.likedIds.includes(id);
        try {
            if (isLiked) {
                await removeFavorite(id, token);
            } else {
                await addFavorite(id, token);
            }
        } catch (err) {
            return rejectWithValue("API error");
        }

        const stared = Array.isArray(track.stared_user) ? track.stared_user : [];
        const newStaredUser = isLiked
            ? stared.filter((u) => u !== userId)
            : [...stared, userId];

        return {id, newStaredUser, newIsLiked: !isLiked, track};
    }
);

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<Track>) => {
            state.currentTrack = action.payload;
            state.isPlaying = true;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        toggleRepeat: state => {
            state.isRepeat = !state.isRepeat;
        },
        toggleShuffle: state => {
            state.isShuffle = !state.isShuffle;
        },
        updateTrack: (state, action: PayloadAction<{ id: number; stared_user: number[] }>) => {
            const { id, stared_user } = action.payload;
            const trackIdx = state.tracks.findIndex((t) => t._id === id);
            if (trackIdx !== -1) state.tracks[trackIdx].stared_user = stared_user;
            if (state.currentTrack?._id === id) state.currentTrack.stared_user = stared_user;
            const likedIdx = state.likedTracks.findIndex((t) => t._id === id);
            if (likedIdx !== -1) state.likedTracks[likedIdx].stared_user = stared_user;
        },
        setTracks: (state, action: PayloadAction<Track[]>) => {
            state.tracks = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadTracks.fulfilled, (state, action) => {
                state.tracks = action.payload;
            })
            .addCase(loadFavorites.fulfilled, (state, action) => {
                state.likedTracks = action.payload;
                state.likedIds = action.payload.map((t) => t._id);
            })
            .addCase(toggleTrackLike.fulfilled, (state, action) => {
                const { id, newStaredUser, newIsLiked, track } = action.payload;
                state.tracks = state.tracks.map((t) => (t._id === id ? { ...t, stared_user: newStaredUser } : t));
                if (state.currentTrack?._id === id) state.currentTrack = { ...state.currentTrack, stared_user: newStaredUser };
                if (newIsLiked) {
                    state.likedTracks.push({ ...track, stared_user: newStaredUser });
                    state.likedIds.push(id);
                } else {
                    state.likedTracks = state.likedTracks.filter((t) => t._id !== id);
                    state.likedIds = state.likedIds.filter((i) => i !== id);
                }
            });
    },
});

export const {
    setCurrentTrack,
    setIsPlaying,
    toggleRepeat,
    toggleShuffle,
    setTracks,
    updateTrack,

} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;

