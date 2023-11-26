const io = require('socket.io-client')

const socket = io('ws://localhost:8088/game', { // room 네임스페이스
    reconnectionDelayMax: 10000,
    secure: true ,   
    reconnect: true,
    rejectUnauthorized: true,
    reconnectionDelayMax: 10000,
    transports: ['websocket'],
  });


async function main () {
    // 연결 이벤트 처리
    socket.connect();

    socket.on('connect_failed', function(){
      console.log('Connection Failed');
    });

    socket.on("connect_error", (err) => {
        console.log(err.message); // prints the message associated with the error
    });


    socket.on('connect', () => {
        // 서버로부터 연결되었다는 메시지를 받습니다.
        socket.on('message', (message) => {
          console.dir(message, { depth: null });
        });
    });
    const gameId = "9817e579-e888-4c65-b6ce-c2f76ded6b87"
    
    // room 참가
    socket.emit('joinRoom', gameId)

    socket.on('task', (message) => {
      console.log('message: ', message); // 1
    });
}
main()