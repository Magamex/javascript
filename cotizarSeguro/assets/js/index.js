//Carga funciones una vez finalizado la pagina
window.onload = function() {
    cargarAnios();
}

function cargarAnios(){
    var objectDate = new Date;
    var anioActual = objectDate.getYear()+1900;

    selectAnio = document.getElementById('selectAnio');

    porcentajeMinimo = 3;
    for (let index = 0; index < 30; index++) {
        var optionSelect = document.createElement('option');
        optionSelect.text = anioActual-index;
        optionSelect.value = index * porcentajeMinimo;
        selectAnio.appendChild(optionSelect);
    }
}

document.getElementById('btnCotizar').addEventListener("click", function(evento){
    evento.preventDefault();
    //Valor del tipo del select
    var selectInputTipo = document.getElementById('selectTipo');
    var valorSelectTipo = selectInputTipo.options[selectInputTipo.selectedIndex].value;
    //Valor del anio del select
    var selectInputAnio = document.getElementById('selectAnio');
    var valorSelectAnio = selectInputAnio.options[selectInputAnio.selectedIndex].value;
    //Valor del Radio Checked
    var valorCheckRadio = document.querySelector('input[name="tipo"]:checked').value;
    var planSimple = 2000;
    var planCompleto = 4500;
    var cotizacion = 0;
    switch (valorSelectTipo) {
        case "Asiatico":
            //Asiatico
            var valorTipo = 500;
            if(valorCheckRadio == 'simple'){
                var cotizacionTemp = valorTipo+planSimple;
                var cotizacionPorcentaje = cotizacionTemp*valorSelectAnio/100;
                cotizacion = cotizacionTemp - cotizacionPorcentaje;
            }else{
                var cotizacionTemp = valorTipo+planCompleto;
                var cotizacionPorcentaje = cotizacionTemp*valorSelectAnio/100;
                cotizacion = cotizacionTemp - cotizacionPorcentaje;
            }
            break;
        case "Americano":
            //Americano
            var valorTipo = 1000;
            if(valorCheckRadio == 'simple'){
                var cotizacionTemp = valorTipo+planSimple;
                var cotizacionPorcentaje = cotizacionTemp*valorSelectAnio/100;
                cotizacion = cotizacionTemp - cotizacionPorcentaje;
            }else{
                var cotizacionTemp = valorTipo+planCompleto;
                var cotizacionPorcentaje = cotizacionTemp*valorSelectAnio/100;
                cotizacion = cotizacionTemp - cotizacionPorcentaje;
            }
            break;
        case "Europeo":
            //Europeo
            var valorTipo = 1500;
            if(valorCheckRadio == 'simple'){
                var cotizacionTemp = valorTipo+planSimple;
                var cotizacionPorcentaje = cotizacionTemp*valorSelectAnio/100;
                cotizacion = cotizacionTemp - cotizacionPorcentaje;
            }else{
                var cotizacionTemp = valorTipo+planCompleto;
                var cotizacionPorcentaje = cotizacionTemp*valorSelectAnio/100;
                cotizacion = cotizacionTemp - cotizacionPorcentaje;
            }
            break;
    }
    console.log(valorSelectTipo);
    console.log(valorCheckRadio);
    console.log(cotizacion);
});