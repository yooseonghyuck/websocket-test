const io = require('socket.io-client')

const socket = io('http://localhost:8081/game', { // room 네임스페이스
    reconnectionDelayMax: 10000,
    //  path: '/socket.io'
  });


async function main () {
    // 연결 이벤트 처리
    socket.connect();
    socket.on('connect', () => {
        // 서버로부터 연결되었다는 메시지를 받습니다.
        socket.on('message', (message) => {
          console.dir(message, { depth: null });
        });
    });
    const gameId = "1313b538-ddcd-4e0a-aaa8-f79fd7d11555"
    
    // room 참가
    // socket.emit('joinRoom', gameId)

    socket.on('task', (message) => {
      console.log('message: ', message); // 1
    });
}
main()