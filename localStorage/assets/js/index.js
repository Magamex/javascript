document.querySelector('#btnGuardar').addEventListener('click', function(evento) {
    evento.preventDefault();     //Prevenir que cambie la pagina
    var input = document.querySelector('#inputTarea');
    var tabla = document.querySelector('#tablaTareas');

    var idTarea = tabla.rows.length;
    localStorage.setItem(`${tabla.rows.length}Tarea`,`${input.value}`);

    var fila = tabla.insertRow(0);
    fila.id = `${idTarea}Tarea`;

    var celda1 = fila.insertCell(0);
    var celda2 = fila.insertCell(1);

    celda1.innerHTML = `${input.value}`;
    celda2.innerHTML = `<a onclick="borrarTarea('${idTarea}')">X</a>`;

    input.value = '';
});

document.addEventListener('DOMContentLoaded',function(evento){
    var tabla = document.querySelector('#tablaTareas');
    for (var i = 0; i < localStorage.length; i++){
        var fila = tabla.insertRow(i);
        fila.id = i+'Tarea';

        var celda1 = fila.insertCell(0);
        var celda2 = fila.insertCell(1);

        celda1.innerHTML = localStorage.getItem(i+'Tarea');
        celda2.innerHTML = `<a onclick="borrarTarea('${i}')">X</a>`;
    }
})

function borrarTarea(id){
    localStorage.removeItem(id+'Tarea');
    var fila = document.getElementById(id+"Tarea");
    fila.parentNode.removeChild(fila);
}