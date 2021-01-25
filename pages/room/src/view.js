class View {
  constructor() {}

  createVideoElement({ muted = true, src, srcObject }) {
    const video = document.createElement('video');
    video.muted = muted;
    video.src = src;
    //srcObject é para video em demanda -> stream
    video.srcObject = srcObject;

    if (src) {
      video.controls = true;
      video.loop = true;
      //Timeout chamado da classe em Util.js
      Util.sleep(200).then((_) => video.play());
    }

    if (srcObject) {
      //conforme o video é carregado e preparado, já está pronto para dar o play
      video.addEventListener('loadmetadata', (_) => video.play());
    }

    return video;
  }

  renderVideo({ userId, stream = null, url = null, isCurrentId = false }) {
    const video = this.createVideoElement({ src: url, srcObject: stream });
    this.appendToHTMLTree(userId, video, isCurrentId);
  }

  appendToHTMLTree(userId, video, isCurrentId) {
    const div = document.createElement('div');
    div.id = userId;
    div.classList.add('wrapper');
    div.append(video);
    const div2 = document.createElement('div');
    //isCurrentId é para verificar se é a própria pessoa na call
    div2.innerText = isCurrentId ? '' : userId;
    div.append(div2);

    const videoGrid = document.getElementById('video-grid');
    videoGrid.append(div);
  }
}
