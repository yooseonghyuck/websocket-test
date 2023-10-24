const io = require('socket.io-client')

const socket = io.connect('http://localhost:8081/game', { // room 네임스페이스
    reconnectionDelayMax: 10000,
    //  path: '/socket.io'
  })


async function main () {
    // 연결 이벤트 처리
    socket.on('connect', () => {
        // // console.log('Connected to Socket.io server!')
        // // 서버로부터 메시지를 받습니다.
        // socket.on('message', (message) => {
        //   console.dir(message, { depth: null })
        // })
    })

    // 서버에 메시지를 보냅니다.
    let message = { 
        taskName: "join",
        data: { 
            gameId: "1313b538-ddcd-4e0a-aaa8-f79fd7d11555", // 참가하려고 하는 game ID
            userId: "ea207555-b57f-4e42-ba7c-bdff26924c2d"  // 참가하려고 하는 user ID
        } 
    }
    socket.emit('message', message)
    
    socket.on('task', (message) => {
        console.log('message: ', message)
    })

    // 연결 종료 이벤트 처리
    // socket.on('disconnect', () => {
    //     console.log('Disconnected from Socket.io server!')
    // })
}
main()