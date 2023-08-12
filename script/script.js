function loaderOn() {
  const overlay = document.getElementById('overlayLoader');
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
}


function loaderOff () {
  document.getElementById("overlayLoader").style.display = "none"
}


function openPopupModificar(id, contenedor) {
  var openPopupButton = document.getElementById(id);
  var form = document.getElementById(contenedor);
  openPopupButton.addEventListener('click', function() {
      form.classList.remove("ocultar");
  });
}

openPopupModificar('fastEmail', 'overlay');


function closePopupModificar(close, cover) {
  document.addEventListener('click', function(event) {
    var closePopupButton = event.target;
    var overlay = event.target;
    if (closePopupButton.id === close || overlay.id === cover) {
      var popup = document.getElementById(cover);
      popup.classList.add("ocultar");
    }
  });
}

closePopupModificar('closePopupBtn', 'overlay');


function mostrarNotificacionPositiva() {
  Swal.fire({
      title: 'Correo enviado satisfactoriamente',
      text: 'Puede revisar su correo para continuar en contacto.',
      icon: 'success', // Puedes usar 'success', 'error', 'warning' o 'info'
      confirmButtonText: 'Aceptar'
  });
}

function mostrarNotificacionNegativa() {
  Swal.fire({
      title: 'Correo no enviado',
      text: 'Podría esperar un momento y volver a intentarlo.',
      icon: 'error', // Puedes usar 'success', 'error', 'warning' o 'info'
      confirmButtonText: 'Aceptar'
  });
}


const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   document.getElementById("closePopupBtn").click();
   loaderOn();

   const serviceID = 'service_zz9xoye';
   const templateID = 'template_jcn7w4t';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      loaderOff ();
      mostrarNotificacionPositiva();

      
    }, (err) => {
      loaderOff ();
      mostrarNotificacionNegativa();
    });
});


function downloadEnglishCv () {
  var fileUrl = "./assets/Julio_en.pdf";

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
  var fileUrl = "./assets/Julio_es.pdf";

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
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-success',
    },
    buttonsStyling: true,
  })
  
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







