document.querySelector('#botonEnviar').addEventListener('click', function(evento){
    var validarInputCorreo = inputCorreo.checkValidity();
    var validarInputAsunto = inputAsunto.checkValidity();
    var validarInputCuerpo = inputCuerpo.checkValidity();
    if(validarInputCorreo == true && validarInputAsunto == true && validarInputCuerpo == true){
        evento.preventDefault();
        enviandoCorreo();
    }
})

document.querySelector('#botonLimpiar').addEventListener('click',function(evento){
    evento.preventDefault();
    limpiarInput();
})

function limpiarInput(){
    var inputCorreo = document.getElementById('inputCorreo');
    var inputAsunto = document.getElementById('inputAsunto');
    var inputCuerpo = document.getElementById('inputCuerpo');

    inputCorreo.value='';
    inputAsunto.value='';
    inputCuerpo.value='';
}

function enviandoCorreo(){
    var divRespuesta = document.getElementById('mensajeRespuesta');
    divRespuesta.removeAttribute('hidden');
    var mensajeRespuesta = document.createElement('img');
    mensajeRespuesta.id = 'imagenRespuesta';
    mensajeRespuesta.style.height = "150px"
    mensajeRespuesta.src = './assets/image/spinner.gif';
    document.getElementById('mensajeRespuesta').appendChild(mensajeRespuesta);
    setTimeout(cambiarEnviando, 4000);
}

function cambiarEnviando(){
    var tagImagen = document.getElementById('imagenRespuesta');
    tagImagen.src = './assets/image/mailSend.gif';
    setTimeout(borrarImg, 2000);
}

function borrarImg(){
    var divRespuesta = document.getElementById('imagenRespuesta');
    divRespuesta.remove();
    limpiarInput()
}