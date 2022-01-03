import io from 'socket.io-client'

const Socket = () => {

    const socket = io(process.env.REACT_APP_WS_HOST, {
        transports:['websocket']
    });

    socket.on("connect", ($fd) => {
        console.log('connect')
        socket.emit('Test1', {asd:"asd"})
    })
    
    socket.on("testcallback", () => {
        console.log('testcallback')
    })

    socket.on("disconnect", () => {
        console.log('disconnect')
    })


}

export default Socket