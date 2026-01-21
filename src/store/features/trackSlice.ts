import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "@/sharedTypes/track";

type initialStateType = {
    currentTrack: null | Track;
    isPlaying: boolean;
    isRepeat: boolean;
    isShuffle: boolean;
    staredByMe: boolean;
    tracks: Track[];
}

const initialState: initialStateType = {
  currentTrack: null,
    isPlaying: false,
    isRepeat: false,
    isShuffle: false,
    staredByMe: false,
    tracks: [],
}

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
        toggleLike: state => {
            state.staredByMe = !state.staredByMe;
        },
        setTracks: (state, action: PayloadAction<Track[]>) => {
            state.tracks = action.payload;
        },
    },
});

export const {
    setCurrentTrack,
    setIsPlaying,
    toggleRepeat,
    toggleShuffle,
    toggleLike,
    setTracks,

} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;

