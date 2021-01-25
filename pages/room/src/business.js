//Aqui é toda a regra de negócio do projeto
class Business {
  constructor({ room, media, view, socketBuilder }) {
    this.media = media;
    this.room = room;
    this.view = view;

    this.socketBuilder = socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnected(this.onUserDisconnected())
      .build();

    this.socketBuilder.emit('join-room', this.room, 'teste01');

    //corrente de dados da câmera ativa
    //mostrar a câmera na tela
    this.currentStream = {};
  }

  //é uma instância da classe quando a classe for chamada
  //protege a classe de alterações
  static initialize(deps) {
    const instance = new Business(deps);
    return instance._init();
  }
  async _init() {
    this.currentStream = await this.media.getCamera();
    this.addVideoStream('teste01');
  }

  //mostrar a câmera da pessoa
  addVideoStream(userId, stream = this.currentStream) {
    const isCurrentId = false;
    this.view.renderVideo({
      userId,
      stream,
      isCurrentId,
    });
  }

  onUserConnected = function () {
    return (userId) => {
      console.log('user connected!', userId);
    };
  };

  onUserDisconnected = function () {
    return (userId) => {
      console.log('user disconnected!', userId);
    };
  };
}
