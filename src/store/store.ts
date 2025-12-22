import {configureStore} from "@reduxjs/toolkit";
import {trackSliceReducer} from "@/store/features/trackSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            tracks: trackSliceReducer,
        },
    });


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
