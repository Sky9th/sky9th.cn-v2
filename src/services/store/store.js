import { configureStore } from '@reduxjs/toolkit'
import notice from "./reducer/noticeReducer";

export default configureStore({
    reducer: {
        notice: notice
    }
})