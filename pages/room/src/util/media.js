class Media {
  async getCamera(audio = false, video = true) {
    //capturar os dados do usuário -> video e áudio
    return navigator.mediaDevices.getUserMedia({
      video,
      audio,
    });
  }
}
