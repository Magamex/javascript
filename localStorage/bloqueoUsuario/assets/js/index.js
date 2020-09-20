document.querySelector('#btnSubmit').addEventListener('click', function(evento){
    var validarInputUser = inputUser.checkValidity();
    var validarInputPass = inputPass.checkValidity();
    if(validarInputUser == true && validarInputPass == true){
        evento.preventDefault();
        var inputUsuario = document.querySelector('#inputUser').value;
        var inputContra = document.querySelector('#inputPass').value;
        if(inputUsuario == 'admin' && inputContra == 'admin'){
            var variableLocalStorage = localStorage.getItem('usuarioBaneado');
            var divBaneado = document.getElementById('divBaneado');
            var divLogueado = document.getElementById('divLogueado');
            if(variableLocalStorage == null || variableLocalStorage == '0'){
                divLogueado.removeAttribute('hidden')
                divBaneado.setAttribute('hidden','');
            }else{
                divBaneado.removeAttribute('hidden');
                divLogueado.setAttribute('hidden','');
            }
        }
    }
});

function usuarioBaneado() {
    localStorage.setItem('usuarioBaneado','1')
}

function usuarioLogueado() {
    localStorage.setItem('usuarioBaneado','0')
}