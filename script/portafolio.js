function mostrarIframe(videoURL) {
    const iframeContainer = document.getElementById('iframeContainer');
    iframeContainer.innerHTML = `
      <iframe width="460" height="320" src="${videoURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;
    // Mostrar el contenedor del iframe estableciendo display: block
    video = document.getElementById("video");
    video.style.display = 'block';
  }


 

  
  