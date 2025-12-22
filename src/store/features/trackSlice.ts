import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "@/sharedTypes/track";

type initialStateType = {
    currentTrack: null | Track;
    isPlaying: boolean;
}

const initialState: initialStateType = {
  currentTrack: null,
    isPlaying: false,
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
        }
    },
});

export const {setCurrentTrack} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
export const {setIsPlaying} = trackSlice.actions;