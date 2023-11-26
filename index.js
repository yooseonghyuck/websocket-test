const io = require('socket.io-client')

const socket = io.connect('ws://localhost:8088/game', { // room 네임스페이스
    secure: true ,   
    reconnect: true,
    rejectUnauthorized: true,
    reconnectionDelayMax: 10000,
    transports: ['websocket'],
  })


async function main () {
    const gameId = "9817e579-e888-4c65-b6ce-c2f76ded6b87"
    // 연결 이벤트 처리
    socket.on('connect_failed', function(){
        console.log('Connection Failed');
    });

    socket.on("connect_error", (err) => {
        console.log(err.message); // prints the message associated with the error
    });

    socket.on('connect', () => {
        // 서버로부터 연결되었다는 메시지를 받습니다.
        socket.on('message', (message) => {
          console.dir(message, { depth: null })
        })
    })
    // 서버에 메시지를 보냅니다.
    let message = { 
        taskName: "join",
        data: { 
            gameId: gameId, // 참가하려고 하는 game ID
            userId: "18b52d00-9986-4511-bccd-f1d313bd19ef"  // 참가하려고 하는 user ID
        } 
    }
    // room 참가
    socket.emit('joinRoom', gameId)

    // task 전달
    socket.emit('message', message)
    

    socket.on('task', (message) => {
        console.log('message: ', message)
    })

    // 연결 종료 이벤트 처리
    socket.on('disconnect', () => {
        console.log('Disconnected from Socket.io server!')
    })
}
main()