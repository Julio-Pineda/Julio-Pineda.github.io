document.querySelector("body > div.preloader")

function loaderOn() {
    document.querySelector("body > div.preloader").style.display = 'block';
  }
  
  
  function loaderOff () {
    document.querySelector("body > div.preloader").style.display = "none"
  }

  function inputBlanks () {
    document.getElementById("from_name").value = "";
    document.getElementById("email_id").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";
  }

function mostrarNotificacionPositiva() {
    Swal.fire({
        title: 'Enviado satisfactoriamente',
        text: 'Responderé en el menor tiempo posible, gracias ' + document.getElementById("from_name").value + '.',
        icon: 'success', // Puedes usar 'success', 'error', 'warning' o 'info'
        confirmButtonText: 'Aceptar'
    });
  }
  
  function mostrarNotificacionNegativa() {
    Swal.fire({
        title: 'Error',
        text: 'Podría esperar un momento y reintentar el envio, gracias.',
        icon: 'error', // Puedes usar 'success', 'error', 'warning' o 'info'
        confirmButtonText: 'Cerrar'
    });
  }
  
    
  document.getElementById('contact_form')
   .addEventListener('submit', function(event) {
     event.preventDefault();
       loaderOn();
  
     const serviceID = 'service_zz9xoye';
     const templateID = 'template_jcn7w4t';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        loaderOff ();
        mostrarNotificacionPositiva();
        inputBlanks();
  
        
      }, (err) => {
        loaderOff ();
        mostrarNotificacionNegativa();
      });
  });

  function downloadEnglishCv () {
    var fileUrl = "./img/assets/Julio_en.pdf";
  
    var fileName = "CV - JULIO CÉSAR PINEDA MORA - WEB DEVELOPER.pdf";
  
    var link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
  
    // Simula un clic en el enlace oculto para descargar el archivo
    document.body.appendChild(link);
    link.click();
  
    // Remueve el enlace del DOM después de la descarga
    document.body.removeChild(link);
  }
  
  function downloadSpanishCv () {
    var fileUrl = "./img/assets/Julio_es.pdf";
  
    var fileName = "CV - JULIO CÉSAR PINEDA MORA - DESARROLLADOR WEB.pdf";
  
    var link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
  
    // Simula un clic en el enlace oculto para descargar el archivo
    document.body.appendChild(link);
    link.click();
  
    // Remueve el enlace del DOM después de la descarga
    document.body.removeChild(link);
  }
  
  
  document.getElementById("btnDescargar").addEventListener("click", function() {
    console.log("click descargar");
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-success',
      },
      buttonsStyling: true,
    })
    console.log("seleccion");
    swalWithBootstrapButtons.fire({
      title: 'Descargar / Download',
      text: "Elija el idioma / Choose the language",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'English',
      cancelButtonText: 'Español',
      confirmButtonColor: '#3368FF',
      cancelButtonColor: '#3368FF',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        downloadEnglishCv ();
        swalWithBootstrapButtons.fire(
          'Downloaded',
          'Curriculum vitae has been downloaded correctly!',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        downloadSpanishCv ();
        swalWithBootstrapButtons.fire(
          'Descargado',
          '¡Curriculum vitae descargado correctamente!',
          'success'
        )
      }
    })
  });
  