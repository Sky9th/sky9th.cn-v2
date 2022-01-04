import io from 'socket.io-client'
import util from "../util/util";

const Socket = () => {

    const socket = io(process.env.REACT_APP_WS_HOST, {
        transports:['websocket']
    });

    socket.on("connect", (fd) => {
        console.log('connect', fd)
        let session = util.encrypt.getSignatureParam()
        socket.emit('auth', {session})
    })

    socket.on("disconnect", (reason) => {
        console.log('disconnect', reason)
    })

    socket.on("authCb", (data) => {
        console.log('authCb', data)
    })


}

export default Socket