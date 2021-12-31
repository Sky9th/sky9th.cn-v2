import { createSlice } from '@reduxjs/toolkit'const noticeItem = {    'title': '通知',    'time': '',    'msg': ''};export const noticeSlice = createSlice({    name: 'notice',    initialState: {        list: [],        pin: {}    },    reducers: {        noticePush: (state, action) => {            let newNotice = Object.assign({}, noticeItem, action.payload)            if(!newNotice.time) {newNotice.time = new Date().toString()}            state.list.unshift(newNotice)        },        noticePop: (state) => {            state.list.pop()        },        pin: (state, payload) => {        }    }})// Action creators are generated for each case reducer functionexport const { noticePush, noticePop } = noticeSlice.actionsexport default noticeSlice.reducer