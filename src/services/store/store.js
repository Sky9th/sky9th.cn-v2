import { configureStore } from '@reduxjs/toolkit'
import noticeSlice from "./reducer/noticeReducer";
import profileSlice from "./reducer/profileReducer";
import modalSlice from "./reducer/modalReducer";

const store = configureStore({
    reducer: {
        notice: noticeSlice,
        profile: profileSlice,
        modal: modalSlice
    }
})

export default store;