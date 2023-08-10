//---------------------------- VARIABLES GLOBALES ----------------------------------------------
//******************************************************************************************* */
const thead = document.getElementById("tabla-nombres");

const buttonContainerDispositivos = document.getElementById("buttonContainerDispositivos");

thead.classList.add("ocultar");
buttonContainerDispositivos.classList.add("ocultar");

const buttonContainer = document.getElementById("buttonContainerEquipos");

const modificarEquipos = document.getElementById("modificarEquipos");

const containerImgEquipos = document.getElementById("containerImgEquipos");

const modificarDispositivos = document.getElementById("modificarDispositivos");

const containerImgDispositivo = document.getElementById("containerImgDispositivo");




//-------------------------------------- NAVBAR -----------------------------------------
function addClickEventToSubMenuItems() {
  const lis = document.querySelectorAll('.submenu li');
  lis.forEach(li => {
    li.addEventListener('click', () => {
      const a = li.querySelector('a');
      if (a) {
        a.click();
      }
    });
  });
}

addClickEventToSubMenuItems();



// --------------------- ALERTA CHINGONA -----------------------
function mostrarAlerta(imagen, mensaje) {
  var dialogo = document.createElement('div');
  dialogo.classList.add('dialogo');

  var imagenElemento = document.createElement('img');
  imagenElemento.src = imagen;
  imagenElemento.classList.add('imagen-dialogo');

  var contenidoElemento = document.createElement('h3');
  contenidoElemento.textContent = mensaje;

  var botonCerrar = document.createElement('button');
  botonCerrar.textContent = 'Cerrar';
  botonCerrar.classList.add('cerrar');

  var botonContinuar = document.createElement('button');
  botonContinuar.textContent = 'Editar más';
  botonContinuar.classList.add('continuar');

  botonCerrar.addEventListener('click', function() {
    document.body.removeChild(dialogo);

    document.getElementById("add-User").scrollIntoView();
    location.reload();
  });

  botonContinuar.addEventListener('click', function() {
    document.body.removeChild(dialogo);
  });

  dialogo.appendChild(imagenElemento);
  dialogo.appendChild(contenidoElemento);
  dialogo.appendChild(botonCerrar);
  dialogo.appendChild(botonContinuar);

  document.body.appendChild(dialogo);
}


function mostrarAlertaNot(imagen, mensaje) {
  var dialogo = document.createElement('div');
  dialogo.classList.add('dialogo');

  var imagenElemento = document.createElement('img');
  imagenElemento.src = imagen;
  imagenElemento.classList.add('imagen-dialogo');

  var contenidoElemento = document.createElement('h3');
  contenidoElemento.textContent = mensaje;

  var botonCerrar = document.createElement('button');
  botonCerrar.textContent = 'Cerrar';
  botonCerrar.classList.add('cerrar');


  botonCerrar.addEventListener('click', function() {
    document.body.removeChild(dialogo);
    console.log("Sin recargar");

  });

  dialogo.appendChild(imagenElemento);
  dialogo.appendChild(contenidoElemento);
  dialogo.appendChild(botonCerrar);

  document.body.appendChild(dialogo);
}


function mostrarConfirm(imagen, mensaje, callbackAceptar, callbackCancelar) {
  var dialogo = document.createElement('div');
  dialogo.classList.add('dialogo');

  var imagenElemento = document.createElement('img');
  imagenElemento.src = imagen;
  imagenElemento.classList.add('imagen-dialogo');

  var contenidoElemento = document.createElement('h3');
  contenidoElemento.textContent = mensaje;

  var botonAceptar = document.createElement('button');
  botonAceptar.textContent = 'Aceptar';
  botonAceptar.id = 'btnAceptarConfirm';

  botonAceptar.addEventListener('click', function() {
    document.body.removeChild(dialogo);
    if (callbackAceptar && typeof callbackAceptar === 'function') {
      callbackAceptar();
    }
  });

  var botonCancelar = document.createElement('button');
  botonCancelar.textContent = 'Cancelar';
  botonCancelar.id = 'btnCancelarConfirm';

  botonCancelar.addEventListener('click', function() {
    document.body.removeChild(dialogo);
    if (callbackCancelar && typeof callbackCancelar === 'function') {
      callbackCancelar();
    }
  });

  dialogo.appendChild(imagenElemento);
  dialogo.appendChild(contenidoElemento);
  dialogo.appendChild(botonAceptar);
  dialogo.appendChild(botonCancelar);

  document.body.appendChild(dialogo);
}



// --------------- BARRA DE BUSQUEDA USUARIOS------------------------
  document.getElementById('form-buscar-usuario').addEventListener('submit', function(event) { 
    event.preventDefault();  

    // Obtener el valor del campo de búsqueda
    var searchTerm = document.getElementById('buscar-Usuario').value;

    // Crear una solicitud AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './PHP/obtener_lista_usuarios.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Manejar la respuesta de la solicitud AJAX
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        generarTablaUsuarios(response);
      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };

    // Manejar el error de la solicitud AJAX
    xhr.onerror = function() {
      console.log('Error en la solicitud.');
    };

    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('buscarUsuarios=' + encodeURIComponent(searchTerm));
  });



// --------------- BARRA DE BUSQUEDA EQUIPOS------------------------
  document.getElementById('formBuscarEquipo').addEventListener('submit', function(event) { 
    event.preventDefault();  

    var searchTerm = document.getElementById('buscar-Placa').value;

    // Crear una solicitud AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './PHP/buscarEquipos.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Manejar la respuesta de la solicitud AJAX
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        buscarUsuarioPlacaInventario(response);

      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };

    // Manejar el error de la solicitud AJAX
    xhr.onerror = function() {
      console.log('Error en la solicitud.');
    };

    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('buscarPlaca=' + encodeURIComponent(searchTerm));
  });


  // --------------- BARRA DE BUSQUEDA DISPOSITIVO ------------------------
  document.getElementById('formBuscarDispositivo').addEventListener('submit', function(event) { 
    event.preventDefault();  

    var searchTerm = document.getElementById('buscarPlacaDispositivo').value;

    // Crear una solicitud AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './PHP/buscarDispositivo.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Manejar la respuesta de la solicitud AJAX
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        buscarUsuarioPlacaInventario(response);

      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };

    // Manejar el error de la solicitud AJAX
    xhr.onerror = function() {
      console.log('Error en la solicitud.');
    };

    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('buscarPlacaDispositivo=' + encodeURIComponent(searchTerm));
  });


// ------------------------------STUCKY FLECHAS ----------------------------------------
function flechasPegajosas(containerId, arrowsId) {
  var flechas = document.getElementById(arrowsId);
  var container = document.getElementById(containerId);

  window.addEventListener('scroll', function() {
    var containerRect = container.getBoundingClientRect();
    var arrowRect = flechas.getBoundingClientRect();

    if (containerRect.top <= 0 && containerRect.bottom >= arrowRect.height) {
      flechas.classList.add("sticky");
    } else {
      flechas.classList.remove("sticky");
    }
  });
}

flechasPegajosas("modificarEquipos", "flechasEquipos");
flechasPegajosas("modificarDispositivos", "flechasDispositivos");



/*   var container = document.getElementById('modificarEquipos');

  window.addEventListener('scroll', function() {
    var containerRect = container.getBoundingClientRect();
    var arrowRect1 = atrasEquipos.getBoundingClientRect();
    var arrowRect2 = siguienteEquipos.getBoundingClientRect();
  
    if (containerRect.top <= 0 && containerRect.bottom >= arrowRect1.height && arrowRect2.height) {
      atrasEquipos.classList.add("stickyLeft");
      siguienteEquipos.classList.add("stickyRight");
    } else {
      atrasEquipos.classList.remove("stickyLeft");
      siguienteEquipos.classList.remove("stickyRight");
    }
  });
 */

  // ------------------------------------ BORRAR FORMULARIO EQUIPOS ----------------------------------
      // Función para dejar en blanco los valores del formulario
      function limpiarFormulario() {
        
        document.getElementById('idFilaEquipo').value = '';
        document.getElementById('dependenciaEquipos_Modificar').value = '';
        document.getElementById('nombre_equipo_Modificar').value = '';
        document.getElementById('direccion_ip_Modificar').value = '';
        document.getElementById('tipo-equipo_Modificar').value = '';
        document.getElementById('marca_Modificar').value = '';
        document.getElementById('modelo_Modificar').value = '';
        document.getElementById('service-tag_Modificar').value = '';
        document.getElementById('placa-inventario_Modificar').value = '';
        document.getElementById('sistema-operativo_Modificar').value = '';
        document.getElementById('serial-window_Modificar').value = '';
        document.getElementById('serial-office_Modificar').value = '';
        document.getElementById('observaciones_Modificar').value = '';
    
        // Limpiar los checkboxes de programas
        var programasCheckbox = document.querySelectorAll('input[name="programas[]"]');
        programasCheckbox.forEach(function (checkbox) {
          checkbox.checked = false;
        });
  
        document.getElementById('imagenOffice').src = '';
        document.getElementById('imagenWindows').src = '';

        document.getElementById('modificar-equipos').reset();
      }



// --------------------------------   BUSCAR USUARIO POR PLACA DE INVENTARIO   ------------------------------------

function buscarUsuarioPlacaInventario(idUsuario) {
  if(idUsuario == "") {
    mostrarAlerta('./assets/DELETING.png', "Equipo inexistente");
  } else {
    var searchTerm = idUsuario;

  // Crear una solicitud AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './PHP/obtener_lista_usuarios.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Manejar la respuesta de la solicitud AJAX
  xhr.onload = function() {
    if (xhr.status === 200) {
      // La solicitud se completó con éxito
      var response = xhr.responseText;
      console.log(response);
      generarTablaUsuarios(response);
    } else {
      // La solicitud falló
      console.log('Error en la solicitud. Estado: ' + xhr.status);
    }
  };

  // Manejar el error de la solicitud AJAX
  xhr.onerror = function() {
    console.log('Error en la solicitud.');
  };

  // Enviar la solicitud AJAX con los datos de búsqueda
  xhr.send('buscarUsuarios=' + encodeURIComponent(searchTerm));

    setTimeout(function() {
      document.querySelector("#tabla-nombres > tbody > tr").click();
    }, 750);
  }
}


// --------------------------------   MOSTRAR POSICIÓN DE LA PLACA EN SPAN ----------------------------

function posicionPlaca(array, valor) {
  let posicionEncontrada;

  for (let i = 0; i < array.length; i++) {
    if (Object.values(array[i]).includes(valor)) {
      posicionEncontrada = i + 1;
      break;
    }
  }

  if (posicionEncontrada !== -1) {
    document.getElementById('posicionPlaca').innerText = "Placa de inventario corresponde al equipo n° " + posicionEncontrada.toString() + " ✅";
  }

  return posicionEncontrada;
}



function posicionPlacaDispositivo(array, valor) {
  let posicionEncontrada;

  for (let i = 0; i < array.length; i++) {
    if (Object.values(array[i]).includes(valor)) {
      posicionEncontrada = i + 1;
      break;
    }
  }

  if (posicionEncontrada !== -1) {
    document.getElementById('posicionPlacaDispositivo').innerText = "Placa de inventario corresponde al equipo n° " + posicionEncontrada.toString() + " ✅";
  }

  return posicionEncontrada;
}



// --------------------------------   PASARLE VALORES A MODIFICAR USUARIOS   ------------------------------------
function obtenerValoresPersona(persona) {
  const id = persona.id;
  const nombre = persona.nombre;
  const cedula = persona.cedula;
  const celular = persona.celular;
  const email = persona.email;
  const dependencia = persona.dependencia;

  asignarValoresInputs(id, nombre, cedula, celular, email, dependencia);
}

function asignarValoresInputs(id, nombre, cedula, celular, email, dependencia) {
  document.getElementById("id").value = id;
  document.getElementById("idEliminar").value = id;
  document.getElementById('idModificarEquipos').value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("usuarioActual").innerText = nombre;
  document.getElementById("usuarioActualDispositivo").innerText = nombre;
  document.getElementById("cedula").value = cedula;
  document.getElementById("celular").value = celular;
  document.getElementById("email").value = email;
  document.querySelector("select[name='dependencia']").value = dependencia;
}



// --------------------------------- USUARIOS  ----------------------------------


function generarTablaUsuarios(resultados) {
  if (resultados === "No se encontraron resultados en primera instancia." || resultados === "Búsqueda inválida.") {
    mostrarAlerta('./assets/DELETE-USER.png', "Usuario inexistente");
  }    
  const personas = JSON.parse(resultados);

  const tabla = document.getElementById("tabla-nombres");
  const tbody = tabla.querySelector("tbody");

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  let filaSeleccionada = null;

  function handleClickFila(persona) {
    if (filaSeleccionada) {
      filaSeleccionada.classList.remove("fila-seleccionada");
    }

    filaSeleccionada = this;

    filaSeleccionada.classList.add("fila-seleccionada");
    
    idSeleccionado = persona.id;
    console.log("ID de la fila seleccionada:", idSeleccionado);
    
    buttonContainer.classList.remove("ocultar");
    buttonContainerDispositivos.classList.remove("ocultar");
    modificarEquipos.classList.remove("ocultar");
    containerImgEquipos.classList.remove("ocultar");
    modificarDispositivos.classList.remove("ocultar");
    containerImgDispositivo.classList.remove("ocultar");

    const filas = Array.from(tbody.getElementsByTagName("tr"));
    filas.forEach(fila => {
      if (fila !== filaSeleccionada) {
        fila.style.display = "none";
      }
    });

    crearBotonVolver();
    const usuarioElement = document.getElementById("buscar-Usuario");
    usuarioElement.scrollIntoView({ behavior: "smooth", block: "start" });

    obtenerValoresPersona(persona);
    limpiarFormulario();
    console.log("limpiarFormulario: HANDLECLICK");
    submitForm();
    submitFormDispositivos();
  }

  function crearBotonVolver() {
    const botonVolver = document.getElementById("boton-volver");
    botonVolver.style.display = "block";
    botonVolver.addEventListener("click", function() {
    buttonContainer.classList.add("ocultar");
    buttonContainerDispositivos.classList.add("ocultar");
    modificarEquipos.classList.add("ocultar");
    containerImgEquipos.classList.add("ocultar");
    modificarDispositivos.classList.add("ocultar");
    containerImgDispositivo.classList.add("ocultar");
    limpiarFormulario();
    });
    botonVolver.addEventListener("click", volverEstadoAnterior);
  }

  function volverEstadoAnterior() {
    const filas = Array.from(document.querySelectorAll("#tabla-nombres tbody tr"));
    filas.forEach(fila => {
      fila.style.display = "";
    });

    if (filaSeleccionada) {
      filaSeleccionada.classList.remove("fila-seleccionada");
      filaSeleccionada.classList.remove("fila-seleccionada");
      filaSeleccionada = null;
    }

    const botonVolver = document.getElementById("boton-volver");
    botonVolver.style.display = "none";
  }

  personas.forEach(persona => {
    thead.classList.remove("ocultar");
    const fila = document.createElement("tr");

    const columnaNombre = document.createElement("td");
    columnaNombre.textContent = persona.nombre;

    const columnaCedula = document.createElement("td");
    columnaCedula.textContent = persona.cedula;

    const columnaCelular = document.createElement("td");
    columnaCelular.textContent = persona.celular;

    const columnaEmail = document.createElement("td");
    columnaEmail.textContent = persona.email;

    const columnaDependencia = document.createElement("td");
    columnaDependencia.textContent = persona.dependencia;

    console.log(persona.id + persona.nombre + persona.cedula + persona.celular + persona.email + persona.dependencia);

    fila.appendChild(columnaNombre);
    fila.appendChild(columnaCedula);
    fila.appendChild(columnaCelular);
    fila.appendChild(columnaEmail);
    fila.appendChild(columnaDependencia);

    fila.addEventListener("click", handleClickFila.bind(fila, persona));

    tbody.appendChild(fila);
  });
}



//----------------------- SOLICITUD AJAX REGISTRO DE USUARIOS ----------------------
document.addEventListener("DOMContentLoaded", function() {
  openPopup('add-User', './agregarUsuario.php');

  // Escuchar el envío del formulario en form.html
  document.addEventListener('submit', function(e) {
    if (e.target && e.target.id === 'agregar-usuario') {
      e.preventDefault(); // Evitar el envío del formulario

      // Obtener los valores del formulario
      var nombre = document.getElementById("nombre-agregar").value;
      var cedula = document.getElementById("cedula-agregar").value;
      var celular = document.getElementById("celular-agregar").value;
      var email = document.getElementById("email-agregar").value;
      var dependencia = document.getElementById("dependencia-agregar").value;


      // Crear una solicitud AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "./PHP/tablaUsuarios.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      // Configurar la función de respuesta
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Mostrar la respuesta del servidor
            console.log(xhr.responseText);
            if(xhr.responseText === "Correcto"){
            document.querySelector("#closePopupBtn").click();
            mostrarAlerta('./assets/UPLOAD - SEND.png', "Usuario registrado correctamente");
          } else {
            document.querySelector("#closePopupBtn").click();
            mostrarAlertaNot('./assets/ALERTA.png', xhr.responseText);
          }
          } else {
            // Mostrar mensaje de error si ocurre algún problema
            alert("Error al enviar los datos: " + xhr.statusText);
          }
        }
      };

      // Enviar los datos del formulario
      var formData = "nombre-agregar=" + encodeURIComponent(nombre) +
        "&cedula-agregar=" + encodeURIComponent(cedula) +
        "&celular-agregar=" + encodeURIComponent(celular) +
        "&email-agregar=" + encodeURIComponent(email) +
        "&dependencia-agregar=" + encodeURIComponent(dependencia);

      xhr.send(formData);
    }
  });
});



//----------------------- MODIFICAR DE USUARIOS ----------------------
document.addEventListener("DOMContentLoaded", function() {

  document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'btnEnviarModificarUsuario') {
      e.preventDefault(); 

      var id = document.getElementById("id").value;
      var nombre = document.getElementById("nombre").value;
      var cedula = document.getElementById("cedula").value;
      var celular = document.getElementById("celular").value;
      var email = document.getElementById("email").value;
      var dependencia = document.getElementById("dependencia").value;


      // Crear una solicitud AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "./PHP/tablaModificarUsuarios.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      // Configurar la función de respuesta
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Mostrar la respuesta del servidor
            console.log(xhr.responseText);
            if(xhr.responseText === "Correcto"){
            document.getElementById('closePopupModificarBtn').click();
            mostrarAlerta('./assets/UPLOAD - SEND.png', "Usuario actualizado correctamente");
          } else {
            document.getElementById('closePopupModificarBtn').click();
            mostrarAlertaNot('./assets/ALERTA.png', xhr.responseText);
          }
          } else {
            // Mostrar mensaje de error si ocurre algún problema
            alert("Error al enviar los datos: " + xhr.statusText);
          }
        }
      };
      console.log("PILAS 3" );
      // Enviar los datos del formulario
      var formData = "id=" + encodeURIComponent(id) +
        "&nombre_Modificar=" + encodeURIComponent(nombre) +
        "&cedula_Modificar=" + encodeURIComponent(cedula) +
        "&celular_Modificar=" + encodeURIComponent(celular) +
        "&email_Modificar=" + encodeURIComponent(email) +
        "&dependencia=" + encodeURIComponent(dependencia);

      xhr.send(formData);
    }
  });
});


//--------------------- BOTÓN MODIFICAR ------------------------

function openPopupModificar(id, contenedor) {
  var openPopupButton = document.getElementById(id);
  var form = document.getElementById(contenedor);
  openPopupButton.addEventListener('click', function() {
      form.classList.remove("ocultar");
  });
}

openPopupModificar('edit-User', 'overlayModificar');
openPopupModificar('edit-Pc', 'overlayModificarEquipo');
openPopupModificar('edit-dispositivo', 'overlayModificarDispositivo');
openPopupModificar('transfer-Pc', 'overlayTransferirPc');
openPopupModificar('transfer-dispositivo', 'overlayTransferirDispositivo');


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

closePopupModificar('closePopupModificarBtn', 'overlayModificar');
closePopupModificar('closeModificarEquipo', 'overlayModificarEquipo');
closePopupModificar('closeModificarDispositivo', 'overlayModificarDispositivo');
closePopupModificar('closeTransferirPc', 'overlayTransferirPc');
closePopupModificar('closeTransferirDispositivo', 'overlayTransferirDispositivo');



//-------------------------------- ELIMINAR SCRIPT Y BOTÓN ----------------------------------

document.getElementById('delete-User').addEventListener('click', function(event) {
  event.preventDefault();

  // Obtener el valor del campo de búsqueda
  var inputEliminar = document.getElementById('idEliminar').value;

  // Crear una solicitud AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './PHP/metodo_pa_eliminar.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  setTimeout(() => {
    mostrarAlertaNot('./assets/ALERTA.png', "Recuerde que al eliminar un usuario eliminará también los equipos y dispositivos a su cargo, perdiendo todos los datos. Primeramente, transfiera todos los equipos a inventario antes eliminar un usuario.");
  }, 300);
  
  mostrarConfirm('./assets/ALERT_Y.png', '¿Está seguro que quiere eliminar este usuario?', function() {

    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        if(response === "Correcto"){
        mostrarAlerta('./assets/ELIMINAR ENCARGADO.png', 'Usuario eliminado exitosamente✅');
      } else {
        mostrarAlertaNot('./assets/ALERTA.png', response);
      }
      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };

    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('idEliminar=' + encodeURIComponent(inputEliminar));
  }, function() {
    // Acción a realizar si se selecciona "Cancelar"
    console.log('Se seleccionó Cancelar');
  });
});



//********************************  EQUIPOS  *****************************************
//--------------------------------------------------------------------------------------

// ------------------------------------- AGREGAR EQUIPOS -------------------------------
document.addEventListener("DOMContentLoaded", function() {
  openPopup('add-Pc', './agregarEquipos.php');

  document.addEventListener('submit', function(event) {

    if (event.target && event.target.id === 'agregar-equipos') {
      event.preventDefault();

      var input1 = document.getElementById('idEliminar');
      var idUsuarioEquipo = document.getElementById('idUsuarioEquipo');
      idUsuarioEquipo.value = input1.value;

      var dependencia = document.getElementById("dependenciaEquipos_Registro").value;
      var nombre = document.getElementById("nombre_equipo_Registro").value;
      var direccionIP = document.getElementById("direccion_ip_Registro").value;
      var tipoEquipo = document.getElementById("tipo-equipo_Registro").value;
      var marca = document.getElementById("marca_Registro").value;
      var modelo = document.getElementById("modelo_Registro").value;
      var serviceTag = document.getElementById("service-tag_Registro").value;
      var placaInventario = document.getElementById("placa-inventario_Registro").value;
      var sistemaOperativo = document.getElementById("sistema-operativo_Registro").value;
      var serialWindows = document.getElementById("serial-window_Registro").value;
      var serialOffice = document.getElementById("serial-office_Registro").value;
      var observaciones = document.getElementById("observaciones_Registro").value;
      var imagenEquipos = document.getElementById('imagenEquipos').files[0];
      var imagenEquipos2 = document.getElementById('imagenEquipos2').files[0];

      // Obtener los checkboxes marcados de programas
      var programas = document.querySelectorAll("#programasAgregarEquipos:checked");
      var programasSeleccionados = Array.from(programas).map(function(programa) {
        var valor = programa.value;
        console.log(valor);
        return valor;
      });

      console.log(programasSeleccionados);

      var datos = JSON.stringify(programasSeleccionados);

      // Crear un objeto FormData para enviar los datos
      var formData = new FormData();
      formData.append('idUsuarioEquipo', idUsuarioEquipo.value);
      formData.append('dependenciaEquipos', dependencia);
      formData.append('nombre_equipo', nombre);
      formData.append('direccion_ip', direccionIP);
      formData.append('tipo-equipo', tipoEquipo);
      formData.append('marca', marca);
      formData.append('modelo', modelo);
      formData.append('service-tag', serviceTag);
      formData.append('placa-inventario', placaInventario);
      formData.append('sistema-operativo', sistemaOperativo);
      formData.append('serial-windows', serialWindows);
      formData.append('serial-office', serialOffice);
      formData.append('observacionesEquipos', observaciones);
      formData.append('programas', datos);
      formData.append('imagenEquipos', imagenEquipos);
      formData.append('imagenEquipos2', imagenEquipos2);

      // Crear una solicitud AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "./PHP/form_agregarEquipos.php", true);

      // Configurar la función de respuesta
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Mostrar la respuesta del servidor
            console.log(xhr.responseText);
            if(xhr.responseText === "Correcto"){
            document.getElementById('closePopupBtn').click();
            mostrarAlerta('./assets/UPLOAD - SEND.png', "Equipo registrado exitosamente");
          } else {
            document.getElementById('closePopupBtn').click();
            mostrarAlertaNot('./assets/ALERTA.png', xhr.responseText);
          }
          } else {
            // Mostrar mensaje de error si ocurre algún problema
            alert("Error al enviar los datos: " + xhr.statusText);
            console.log(xhr.statusText);
          }
        }
      };

      // Enviar los datos del formulario
      xhr.send(formData);
    }
  });
});




// ------------------------- OBTENER LISTA MODIFICAR EQUIPOS -------------------------
  function submitForm() {
    var idCapturado = document.getElementById('idModificarEquipos').value;
  
    // Crear una solicitud AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './PHP/obtener_lista_Equipos.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    // Manejar la respuesta de la solicitud AJAX
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        obtenerDatosModificarEquipos(response);
      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };
  
    // Manejar el error de la solicitud AJAX
    xhr.onerror = function() {
      console.log('Error en la solicitud.');
    };
  
    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('idModificarEquipos=' + encodeURIComponent(idCapturado));
    
  }
/*   
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('formIdModificarEquipos').addEventListener('submit', function(event) {
      event.preventDefault();
      submitForm();
    });
  });
   */
  function obtenerDatosModificarEquipos(resultados) {
    if (resultados === "No se encontraron resultados.") {
      mostrarAlertaNot('./assets/DELETING.png', "No hay equipos asociados a este usuario");

      setTimeout(function() {
        modificarEquipos.classList.add("ocultar");
        containerImgEquipos.classList.add("ocultar");
      }, 200);
      return;
    }

    // Arreglo con los datos del formulario
    var arregloDatos = JSON.parse(resultados);
    

    var inputValue = document.querySelector("#buscar-Placa").value;
    if (inputValue.trim() !== "") {
      setTimeout(function() {
        posicionPlaca(arregloDatos, document.getElementById('buscar-Placa').value);
      }, 300);
    } else {
      console.log("El input está vacío.");
    }

  
    var indiceActual = 0; // Índice del arreglo actual
    var cantidadObjetos = arregloDatos.length; // Cantidad total de objetos
  
    // Función para llenar el formulario con los datos del arreglo actual
    function llenarFormulario() {
      limpiarFormulario();
      console.log("limpiarFormulario: LLENAR FORM");
      var datosActuales = arregloDatos[indiceActual];
      document.getElementById('idFilaEquipo').value = datosActuales.id;
      document.getElementById('dependenciaEquipos_Modificar').value = datosActuales.dependencia;
      document.getElementById('nombre_equipo_Modificar').value = datosActuales['Nombre de equipo'];
      document.getElementById('direccion_ip_Modificar').value = datosActuales['Direccion Ip'];
      document.getElementById('tipo-equipo_Modificar').value = datosActuales['Tipo De Equipo'];
      document.getElementById('marca_Modificar').value = datosActuales.Marca;
      document.getElementById('modelo_Modificar').value = datosActuales.Modelo;
      document.getElementById('service-tag_Modificar').value = datosActuales['Service Tag'];
      document.getElementById('placa-inventario_Modificar').value = datosActuales['placa de inventario'];
      document.getElementById('sistema-operativo_Modificar').value = datosActuales['Sistema Operativo'];
      document.getElementById('serial-window_Modificar').value = datosActuales['Serial Windows'];
      document.getElementById('serial-office_Modificar').value = datosActuales['Serial Office'];
      document.getElementById('observaciones_Modificar').value = datosActuales.Observaciones;

      //**********************   SPAN   ******************************

      document.getElementById('Equipo_1').innerText = datosActuales.dependencia;
      document.getElementById('Equipo_2').innerText = datosActuales['Nombre de equipo'];
      document.getElementById('Equipo_3').innerText = datosActuales['Direccion Ip'];
      document.getElementById('Equipo_4').innerText = datosActuales['Tipo De Equipo'];
      document.getElementById('Equipo_5').innerText = datosActuales.Marca;
      document.getElementById('Equipo_6').innerText = datosActuales.Modelo;
      document.getElementById('Equipo_7').innerText = datosActuales['Service Tag'];
      document.getElementById('Equipo_8').innerText = datosActuales['placa de inventario'];
      document.getElementById('Equipo_9').innerText = datosActuales['Sistema Operativo'];
      document.getElementById('Equipo_10').innerText = datosActuales['Serial Windows'];
      document.getElementById('Equipo_11').innerText = datosActuales['Serial Office'];
      document.getElementById('Equipo_12').innerText = datosActuales.programas;
      document.getElementById('Equipo_13').innerText = datosActuales.Observaciones;
  
      // Actualizar los checkboxes de programas
      var programasCheckbox = document.querySelectorAll("#programasEquipos");
      programasCheckbox.forEach(function (checkbox) {
        checkbox.checked = datosActuales.programas.includes(checkbox.value);
      });


      // Establecer la fuente de la imagen utilizando el contenido base64
      document.getElementById('imagenOffice').src = 'data:image/jpeg;base64,' + datosActuales.imagen_office;
      document.getElementById('imagenWindows').src = 'data:image/jpeg;base64,' + datosActuales.imagen_windows;

      document.getElementById('imagenPlaca').src = 'data:image/jpeg;base64,' + datosActuales.imagen;
      document.getElementById('imagenSerial').src = 'data:image/jpeg;base64,' + datosActuales.imagen2;

      document.getElementById('indiceObjeto').innerText = "Equipo n° " + (indiceActual + 1).toString();
      document.getElementById('cantidadObjetos').innerText = "Equipos a cargo: " + cantidadObjetos.toString();


      document.getElementById('numeroEquipoInput').addEventListener('keyup', function (event) {
        if (event.key === "Enter") {
          var numeroDeseado = parseInt(this.value) - 1;
          if (numeroDeseado >= 0 && numeroDeseado < cantidadObjetos) {
            indiceActual = numeroDeseado;
            llenarFormulario();
          } else {
            console.log("El número de equipo ingresado no es válido.");
          }
        }
      });
      
      document.addEventListener('click', function (event) {
        var numeroEquipoInput = document.getElementById('numeroEquipoInput');
        if (event.target !== numeroEquipoInput) {
          numeroEquipoInput.blur();
        }
      });

    }
  
    // Función para manejar el evento de clic en la flecha izquierda
    document.getElementById("atrasEquipos").addEventListener('click', function () {
      if (indiceActual > 0) {
        indiceActual--;
      } else {
        // Si ya estás en el primer arreglo, retrocede al último
        indiceActual = arregloDatos.length - 1;
      }
      llenarFormulario();
    });
  
    // Función para manejar el evento de clic en la flecha derecha
    document.getElementById("siguienteEquipos").addEventListener('click', function () {
      if (indiceActual < arregloDatos.length - 1) {
        indiceActual++;
      } else {
        // Si ya estás en el último arreglo, avanza al primero
        indiceActual = 0;
      }
      llenarFormulario();
    });
  
    setTimeout (function(){llenarFormulario();}, 300);
     
      if (document.getElementById('nombre_equipo_Modificar').value === '') {
        llenarFormulario();
      }

  }


// -------------- ACTUALIZAR EQUIPOS CON DATOS YA INGRESADA --------------------------

document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener('submit', function(event) {

    if (event.target && event.target.id === 'modificar-equipos') {
      event.preventDefault();

      var idFilaEquipo = document.getElementById('idFilaEquipo').value;
      var idModificarEquipos = document.getElementById('idModificarEquipos').value;
      var dependencia = document.getElementById("dependenciaEquipos_Modificar").value;
      var nombre = document.getElementById("nombre_equipo_Modificar").value;
      var direccionIP = document.getElementById("direccion_ip_Modificar").value;
      var tipoEquipo = document.getElementById("tipo-equipo_Modificar").value;
      var marca = document.getElementById("marca_Modificar").value;
      var modelo = document.getElementById("modelo_Modificar").value;
      var serviceTag = document.getElementById("service-tag_Modificar").value;
      var placaInventario = document.getElementById("placa-inventario_Modificar").value;
      var sistemaOperativo = document.getElementById("sistema-operativo_Modificar").value;
      var serialWindows = document.getElementById("serial-window_Modificar").value;
      var serialOffice = document.getElementById("serial-office_Modificar").value;
      var observaciones = document.getElementById("observaciones_Modificar").value;
      var img = document.getElementById("imagen_ModificarEquipo").files[0];
      var img2 = document.getElementById("imagen_ModificarEquipo2").files[0];

      // Obtener los checkboxes marcados de programas
      var programas = document.querySelectorAll("#programasEquipos:checked");
      var programasSeleccionados = Array.from(programas).map(function(programa) {
        var valor = programa.value;
        console.log(valor);
        return valor;
      });

      console.log(programasSeleccionados);

      var datos = JSON.stringify(programasSeleccionados);

      var formData = new FormData();
      formData.append('idFilaEquipo', idFilaEquipo);
      formData.append('idModificarEquipos', idModificarEquipos);
      formData.append('dependenciaEquipos_Modificar', dependencia);
      formData.append('nombre_equipo_Modificar', nombre);
      formData.append('direccion_ip_Modificar', direccionIP);
      formData.append('tipo-equipo_Modificar', tipoEquipo);
      formData.append('marca_Modificar', marca);
      formData.append('modelo_Modificar', modelo);
      formData.append('service-tag_Modificar', serviceTag);
      formData.append('placa-inventario_Modificar', placaInventario);
      formData.append('sistema-operativo_Modificar', sistemaOperativo);
      formData.append('serial-windows_Modificar', serialWindows);
      formData.append('serial-office_Modificar', serialOffice);
      formData.append('observaciones_Modificar', observaciones);
      formData.append('programasModificar', datos);
      formData.append('imagen_ModificarEquipo', img);
      formData.append('imagen_ModificarEquipo2', img2);
      

      // Crear una solicitud AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "./PHP/form_modificarEquipos.php", true);

      // Configurar la función de respuesta
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Mostrar la respuesta del servidor
              console.log(xhr.responseText);
              if(xhr.responseText === "Correcto"){
              document.getElementById('closeModificarEquipo').click();
              mostrarAlerta('./assets/UPLOAD - SEND.png', "Equipo actualizado exitosamente");
            } else {
              document.getElementById('closeModificarEquipo').click();
              mostrarAlertaNot('./assets/ALERTA.png', xhr.responseText);
            }
          } else {
            // Mostrar mensaje de error si ocurre algún problema
            alert("Error al enviar los datos: " + xhr.statusText);
            console.log(xhr.statusText);
          }
        }
      };

      // Enviar los datos del formulario
      xhr.send(formData);
    }
  });
});


//--------------------------ELIMINAR EQUIPOS CON DATOS YA INGRESADA ----------------------

document.getElementById('delete-Pc').addEventListener('click', function(event) {
  event.preventDefault();

  // Obtener el valor del campo de búsqueda
  var filaSeleccionada = document.getElementById('idFilaEquipo').value;

  // Crear una solicitud AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './PHP/eliminarEquipo.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Mostrar la ventana de confirmación personalizada
  mostrarConfirm('./assets/ALERT_Y.png', '¿Está seguro que desea eliminar este equipo?', function() {
    // Acción a realizar si se selecciona "Aceptar"
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        if(response === "Correcto"){
        mostrarAlerta('./assets/ELIMINAR ENCARGADO.png', 'Equipo eliminado exitosamente✅');
      } else {
        mostrarAlertaNot('./assets/ALERTA.png', response);
      }
      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };

    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('idFilaEquipo=' + encodeURIComponent(filaSeleccionada));
  }, function() {
    // Acción a realizar si se selecciona "Cancelar"
    console.log('Se seleccionó Cancelar');
  });
});


//********************************  DISPOSITIVOS  *****************************************
//-----------------------------------------------------------------------------------------

//-----------------------------REGISTRAR DISPOSITIVOS -------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  openPopup('add-dispositivo', './agregarDispositivos.php');

  document.addEventListener('submit', function(event) {
    if (event.target && event.target.id === 'agregar-dispositivo') {
      event.preventDefault();

      var input1 = document.getElementById('idEliminar');
      var idUsuarioDispositivo = document.getElementById('idUsuarioDispositivo');
      idUsuarioDispositivo.value = input1.value;

      var idUsuarioDispositivoInput = document.getElementById("idUsuarioDispositivo");
      var dependenciaInput = document.getElementById("dependencia_AgregarDispositivo");
      var marcaInput = document.getElementById("marca_AgregarDispositivo");
      var modeloInput = document.getElementById("modelo_AgregarDispositivo");
      var serviceTagInput = document.getElementById("service-tag_AgregarDispositivo");
      var placaInventarioInput = document.getElementById("placa-inventario_AgregarDispositivo");
      var direccion = document.getElementById("direccion_ip_AgregarDispositivo");
      var tipoDispositivoInput = document.getElementById("tipo-dispositivo_AgregarDispositivo");
      var observacionesInput = document.getElementById("observaciones_AgregarDispositivo");
      var imagenDispositivoInput = document.getElementById("imagenDispositivo");
      var imagenDispositivoInput2 = document.getElementById("imagenDispositivo2");

      // Crear una solicitud AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "./PHP/form_agregarDispositivos.php", true);

      // Configurar la función de respuesta
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          if(xhr.responseText === "Correcto"){
          document.getElementById('closePopupBtn').click();
          mostrarAlerta('./assets/UPLOAD - SEND.png', "Dispositivo registrado exitosamente");
        } else {
          document.getElementById('closePopupBtn').click();
          mostrarAlertaNot('./assets/ALERTA.png', xhr.responseText);
        }
 
        } else {
          console.error("Error en la solicitud. Estado: " + xhr.status);
        }
      };

      // Crear un objeto FormData y agregar los datos del formulario
      var formData = new FormData();
      formData.append("idUsuarioDispositivo", idUsuarioDispositivoInput.value);
      formData.append("dependencia_AgregarDispositivo", dependenciaInput.value);
      formData.append("marca_AgregarDispositivo", marcaInput.value);
      formData.append("modelo_AgregarDispositivo", modeloInput.value);
      formData.append("service-tag_AgregarDispositivo", serviceTagInput.value);
      formData.append("placa-inventario_AgregarDispositivo", placaInventarioInput.value);
      formData.append("direccion_ip_AgregarDispositivo", direccion.value);
      formData.append("tipo-dispositivo_AgregarDispositivo", tipoDispositivoInput.value);
      formData.append("observaciones_AgregarDispositivo", observacionesInput.value);
      formData.append("imagenDispositivo", imagenDispositivoInput.files[0]);
      formData.append("imagenDispositivo2", imagenDispositivoInput2.files[0]);
      

      // Enviar los datos del formulario
      xhr.send(formData);
    }
  });
});



//------------------------OBTENER LISTA DE DISPOSITIVOS -------------------------------------------
function submitFormDispositivos() {
  var idCapturado = document.getElementById('idModificarEquipos').value;

  // Crear una solicitud AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './PHP/obtener_lista_Dispositivos.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Manejar la respuesta de la solicitud AJAX
  xhr.onload = function() {
    if (xhr.status === 200) {
      // La solicitud se completó con éxito
      var response = xhr.responseText;
      console.log(response);
      obtenerDatosModificarDispositivos(response);
      
    } else {
      // La solicitud falló
      console.log('Error en la solicitud. Estado: ' + xhr.status);
    }
  };

  // Manejar el error de la solicitud AJAX
  xhr.onerror = function() {
    console.log('Error en la solicitud.');
  };

  // Enviar la solicitud AJAX con los datos de búsqueda
  xhr.send('idModificarEquipos=' + encodeURIComponent(idCapturado));
}

function obtenerDatosModificarDispositivos(resultados) {
  if (resultados === "No se encontraron resultados.") {
    mostrarAlertaNot('./assets/DELETING.png', "No hay dispositivos asociados a este usuario");

    setTimeout(function() {
      modificarDispositivos.classList.add("ocultar");
      containerImgDispositivo.classList.add("ocultar");
    }, 200);
    return;
  }
  // Arreglo con los datos del formulario
  var arregloDatosDispositivo = JSON.parse(resultados);

  var inputValue = document.querySelector("#buscarPlacaDispositivo").value;
  if (inputValue.trim() !== "") {
    setTimeout(function() {
      posicionPlacaDispositivo(arregloDatosDispositivo, document.getElementById('buscarPlacaDispositivo').value);
    }, 300);
  } else {
    console.log("El input está vacío.");
  }

  var indiceActualDispositivo = 0; 
  var cantidadDispositivo = arregloDatosDispositivo.length;

  // Función para llenar el formulario con los datos del arreglo actual
  function llenarFormularioDispositivo() {
    limpiarFormulario();
    console.log("limpiarFormulario: LLENAR FORM");
    var datosActualesDispositivo = arregloDatosDispositivo[indiceActualDispositivo];

    document.getElementById('idFilaDispositivo').value = datosActualesDispositivo.id;
    document.getElementById("tipo-dispositivo_ModificarDispositivo").value = datosActualesDispositivo['tipo_dispositivo'];
    document.getElementById("marca_ModificarDispositivo").value = datosActualesDispositivo.marca;

    document.getElementById("modelo_ModificarDispositivo").value = datosActualesDispositivo.modelo;
    document.getElementById("service-tag_ModificarDispositivo").value = datosActualesDispositivo['service_tag'];
    document.getElementById("placa-inventario_ModificarDispositivo").value = datosActualesDispositivo['placa_inventario'];

    document.getElementById("direccion_ip_ModificarDispositivo").value = datosActualesDispositivo.direccion_ip;

    document.getElementById('imgDispositivo').src = 'data:image/jpeg;base64,' + datosActualesDispositivo.imagen;
    document.getElementById('imgDispositivo2').src = 'data:image/jpeg;base64,' + datosActualesDispositivo.imagen2;

    document.getElementById("dependencia_ModificarDispositivo").value = datosActualesDispositivo.dependencia;
    document.getElementById("observaciones_ModificarDispositivo").value = datosActualesDispositivo.observaciones;


    //********************************* SPAN ********************************* */
    //-------------------------------------------------------------------------
    document.getElementById("Dispositivo_1").innerText = datosActualesDispositivo['tipo_dispositivo'];
    document.getElementById("Dispositivo_2").innerText = datosActualesDispositivo.marca;
    document.getElementById("Dispositivo_3").innerText = datosActualesDispositivo.modelo;
    document.getElementById("Dispositivo_4").innerText = datosActualesDispositivo['service_tag'];
    document.getElementById("Dispositivo_5").innerText = datosActualesDispositivo['placa_inventario'];

    document.getElementById("Dispositivo_8").innerText = datosActualesDispositivo.direccion_ip;

    document.getElementById("Dispositivo_6").innerText = datosActualesDispositivo.dependencia;
    document.getElementById("Dispositivo_7").innerText = datosActualesDispositivo.observaciones;


    // Establecer la fuente de la imagen utilizando el contenido base64
    document.getElementById('indiceDispositivos').innerText = "Dispositivo n° " + (indiceActualDispositivo + 1).toString();
    document.getElementById('cantidadDispositivos').innerText = "Disp. a cargo: " + cantidadDispositivo.toString();
    
    document.getElementById('numeroDispositivoInput').addEventListener('keyup', function (event) {
      if (event.key === "Enter") {
        var numeroDeseado = parseInt(this.value) - 1;
        if (numeroDeseado >= 0 && numeroDeseado < cantidadDispositivo) {
          indiceActualDispositivo = numeroDeseado;
          llenarFormularioDispositivo();
        } else {
          console.log("El número de dispositivo ingresado no es válido.");
        }
      }
    });
    
    document.addEventListener('click', function (event) {
      var numeroDispositivoInput = document.getElementById('numeroDispositivoInput');
      if (event.target !== numeroDispositivoInput) {
        numeroDispositivoInput.blur();
      }
    });

  }

  // Función para manejar el evento de clic en la flecha izquierda
  document.getElementById("atrasDispositivos").addEventListener('click', function () {
    if (indiceActualDispositivo > 0) {
      indiceActualDispositivo--;
    } else {
      // Si ya estás en el primer arreglo, retrocede al último
      indiceActualDispositivo = arregloDatosDispositivo.length - 1;
    }
    llenarFormularioDispositivo();
  });

  // Función para manejar el evento de clic en la flecha derecha
  document.getElementById("siguienteDispositivos").addEventListener('click', function () {
    if (indiceActualDispositivo < arregloDatosDispositivo.length - 1) {
      indiceActualDispositivo++;
    } else {
      // Si ya estás en el último arreglo, avanza al primero
      indiceActualDispositivo = 0;
    }
    llenarFormularioDispositivo();
  });

  llenarFormularioDispositivo();
  
  if (document.getElementById('marca_ModificarDispositivo').value === '') {
    llenarFormularioDispositivo();
  }
}


//------------------------ACTUALIZAR LISTA DE DISPOSITIVOS -------------------------------------------

document.addEventListener("DOMContentLoaded", function() {

  document.addEventListener('submit', function(event) {
    if (event.target && event.target.id === 'modificar-dispositivo') {
      event.preventDefault();

      var idFilaDispositivo = document.getElementById('idFilaDispositivo')
      var dependenciaInput = document.getElementById("dependencia_ModificarDispositivo");
      var marcaInput = document.getElementById("marca_ModificarDispositivo");
      var modeloInput = document.getElementById("modelo_ModificarDispositivo");
      var serviceTagInput = document.getElementById("service-tag_ModificarDispositivo");
      var placaInventarioInput = document.getElementById("placa-inventario_ModificarDispositivo");
      var direccion = document.getElementById("direccion_ip_ModificarDispositivo");
      var tipoDispositivoInput = document.getElementById("tipo-dispositivo_ModificarDispositivo");
      var observacionesInput = document.getElementById("observaciones_ModificarDispositivo");
      var imagenDispositivoInput = document.getElementById("imagen_ModificarDispositivo");
      var imagenDispositivoInput2 = document.getElementById("imagen_ModificarDispositivo2");

      // Crear una solicitud AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "./PHP/form_modificarDispositivos.php", true);

      // Configurar la función de respuesta
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          if(xhr.responseText === "Correcto"){
          document.getElementById('closeModificarDispositivo').click();
          mostrarAlerta('./assets/UPLOAD - SEND.png', "Dispositivo actualizado exitosamente");
        } else {
          document.getElementById('closeModificarDispositivo').click();
          mostrarAlertaNot('./assets/ALERTA.png', xhr.responseText);
        }

        } else {
          console.error("Error en la solicitud. Estado: " + xhr.status);
        }
      };

      // Crear un objeto FormData y agregar los datos del formulario
      var formData = new FormData();
      formData.append("idFilaDispositivo", idFilaDispositivo.value);
      formData.append("dependencia_ModificarDispositivo", dependenciaInput.value);
      formData.append("marca_ModificarDispositivo", marcaInput.value);
      formData.append("modelo_ModificarDispositivo", modeloInput.value);
      formData.append("service-tag_ModificarDispositivo", serviceTagInput.value);
      formData.append("placa-inventario_ModificarDispositivo", placaInventarioInput.value);
      formData.append("direccion_ip_ModificarDispositivo", direccion.value);
      formData.append("tipo-dispositivo_ModificarDispositivo", tipoDispositivoInput.value);
      formData.append("observaciones_ModificarDispositivo", observacionesInput.value);
      formData.append("imagen_ModificarDispositivo", imagenDispositivoInput.files[0]);
      formData.append("imagen_ModificarDispositivo2", imagenDispositivoInput2.files[0]);

      // Enviar los datos del formulario
      xhr.send(formData);
    }
  });
});

// -----------------------------------ELIMINAR DISPOSITIVO---------------------------------------------

document.getElementById('delete-dispositivo').addEventListener('click', function(event) {
  event.preventDefault();

  // Obtener el valor del campo de búsqueda
  var filaSeleccionada = document.getElementById('idFilaDispositivo').value;

  // Crear una solicitud AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './PHP/eliminarDispositivo.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Mostrar la ventana de confirmación personalizada
  mostrarConfirm('./assets/ALERT_Y.png', '¿Está seguro que desea eliminar este dispositivo?', function() {
    // Acción a realizar si se selecciona "Aceptar"
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        if(response === "Correcto"){
        mostrarAlerta('./assets/ELIMINAR ENCARGADO.png', 'Dispositivo eliminado exitosamente✅');
      } else {
        mostrarAlertaNot('./assets/ALERTA.png', response);
      }
      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };

    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('idFilaDispositivo=' + encodeURIComponent(filaSeleccionada));
  }, function() {
    // Acción a realizar si se selecciona "Cancelar"
    console.log('Se seleccionó Cancelar');
  });
});




document.getElementById('transferir_Pc').addEventListener('submit', function(event) {
  event.preventDefault();


  document.getElementById("closeTransferirPc").click();
  var filaSeleccionada = document.getElementById('idFilaEquipo')
  var idUsuario = document.getElementById("select_Usuarios_Transferir");

  // Crear una solicitud AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './PHP/form_TransferirEquipo.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Mostrar la ventana de confirmación personalizada
  mostrarConfirm('./assets/ALERT_Y.png', '¿Está seguro que desea transferir este equipo?', function() {
    // Acción a realizar si se selecciona "Aceptar"
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        if(response === "Correcto"){
        mostrarAlerta('./assets/TRANSFER.png', 'Equipo transferido exitosamente');

      } else {
        mostrarAlertaNot('./assets/ALERTA.png', response);
      }
      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };

    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('idFilaEquipo=' + encodeURIComponent(filaSeleccionada.value) 
    + '&select_Usuarios_Transferir=' + encodeURIComponent(idUsuario.value));

    console.log(filaSeleccionada.value, idUsuario.value);


  }, function() {
    // Acción a realizar si se selecciona "Cancelar"
    console.log('Se seleccionó Cancelar');
  });
});



document.getElementById('transferir_Dispositivo').addEventListener('submit', function(event) {
  event.preventDefault();


  document.getElementById("closeTransferirDispositivo").click();
  var filaSeleccionada = document.getElementById('idFilaDispositivo')
  var idUsuario = document.getElementById("select_Usuarios_Transferir_Dispositivos");

  // Crear una solicitud AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', './PHP/form_TransferirDispositivos.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Mostrar la ventana de confirmación personalizada
  mostrarConfirm('./assets/ALERT_Y.png', '¿Está seguro que desea transferir este dispositivo?', function() {
    // Acción a realizar si se selecciona "Aceptar"
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud se completó con éxito
        var response = xhr.responseText;
        console.log(response);
        if(response === "Correcto"){
        mostrarAlerta('./assets/TRANSFER.png', 'Dispositivo transferido exitosamente');

      } else {
        mostrarAlertaNot('./assets/ALERTA.png', response);
      }
      } else {
        // La solicitud falló
        console.log('Error en la solicitud. Estado: ' + xhr.status);
      }
    };

    // Enviar la solicitud AJAX con los datos de búsqueda
    xhr.send('idFilaDispositivo=' + encodeURIComponent(filaSeleccionada.value) 
    + '&select_Usuarios_Transferir_Dispositivos=' + encodeURIComponent(idUsuario.value));

    console.log(filaSeleccionada.value, idUsuario.value);


  }, function() {
    // Acción a realizar si se selecciona "Cancelar"
    console.log('Se seleccionó Cancelar');
  });
});