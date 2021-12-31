import { configureStore } from '@reduxjs/toolkit'
import noticeSlice from "./reducer/noticeReducer";
import profileSlice from "./reducer/profileReducer";

const store = configureStore({
    reducer: {
        notice: noticeSlice,
        profile: profileSlice
    }
})

export default store;