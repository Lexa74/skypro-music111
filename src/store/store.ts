import {configureStore} from "@reduxjs/toolkit";
import {trackSliceReducer} from "@/store/features/trackSlice";
import {userSliceReducer} from "@/store/features/userSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            tracks: trackSliceReducer,
            user: userSliceReducer,
        },
    });


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
