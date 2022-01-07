const modal = {}

modal.show = (dispatch, modal) => {
    dispatch({type:'modal/setVisible', payload:{modal, visible: true}})
}

modal.hide = (dispatch, modal) => {
    dispatch({type:'modal/setVisible', payload:{modal}})
}

export default modal
