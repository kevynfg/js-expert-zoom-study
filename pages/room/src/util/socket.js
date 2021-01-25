class SocketBuilder {
  constructor({ socketUrl }) {
    this.socketUrl = socketUrl;
    this.onUserConnected = () => {};
    this.onUserDisconnected = () => {};
  }

  setOnUserConnected(fn) {
    this.onUserConnected = fn;

    //sempre retorne o THIS (instancia da classe), pois assim consegue instanciar
    //as outras funções da classe também
    return this;
  }

  setOnUserDisconnected(fn) {
    this.onUserDisconnected = fn;

    return this;
  }

  //este metodo é o que vai gerar instancia dos eventos
  //e pegar os objetos que foram criados
  //ele linka todas as funções
  build() {
    //io.connect vem importado da index.html
    const socket = io.connect(this.socketUrl, {
      withCredentials: false,
    });
    //escutar eventos que são emitidos do servidor
    socket.on('user-connected', this.onUserConnected);
    socket.on('user-disconnected', this.onUserDisconnected);

    return socket;
  }
}
