const server = require('http').createServer((request, response) => {
  response.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Origin': 'OPTIONS, POST, GET',
  });
  response.end('hey there!');
});

const { start } = require('repl');
const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: '*',
    credentials: false,
  },
});

//Evento de conexão de usuário, quando o usuário se conectar
//Ele vai mandar pro front end um join-room de cada usuário
io.on('connection', (socket) => {
  console.log('connection', socket.id);
  socket.on('join-room', (roomId, userId) => {
    //adiciona os usuários na mesma sala
    socket.join(roomId);
    //emite um alerta para todos da sala da conexão do usuário
    socket.to(roomId).broadcast.emit('user-connected', userId);
    socket.on('disconnect', () => {
      console.log('disconnected', roomId, userId);
      socket.to(roomId).broadcast.emit('user-disconneected', userId);
    });
  });
});

const startServer = () => {
  const { adress, port } = server.address();
  console.info(`app running at ${adress}:${port}`);
};

//se o ambiente estiver hospedado em um ambiente por EX: heroku
//o process.env.PORT utiliza a porta deste, se não, usa a padrão 3000
server.listen(process.env.PORT || 3000, startServer);
