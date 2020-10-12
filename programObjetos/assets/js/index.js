// Objeto cliente
function Cliente(nombre, saldo){
    this.nombre = nombre;
    this.saldo = saldo;
}
// El tema de los prototipos se utilizaban mucho en la ECMA 5 de javascript 
// en la version 6 se utiliza las clases
Cliente.prototype.verCliente = function(){
    return `Hola ${this.nombre} tu saldo es $${this.saldo}`;
}
var cliente1 = new Cliente('Matias',350);
console.log(cliente1);

// Heredar un objeto usando call
function Celular(nombre, saldo, telefono, tipo, empresa){
    Cliente.call(this, nombre, saldo);
    this.telefono = telefono;
    this.tipo = tipo;
    this.empresa = empresa;
}
Celular.prototype = Object.create(Cliente.prototype);
var celular1 = new Celular('Martin',800,2225423456,'basico','personal');
console.log(celular1);

// Usando la funcion Object create
const Taringa = {
    verEstadisticas: function(){
        return `Su usuario ${this.nombre} tiene ${this.seguidores}`;
    },
    agregarSeguidor: function(){
        return this.seguidores += 1;
    }
}
const usuario1 = Object.create(Taringa);
usuario1.nombre = '22matutex22';
usuario1.seguidores = 500;
usuario1.mensaje = 'Hola a todos seguime!!!';

//Clases se utiliza a partir de ECMA 6 ya no se utiliza los prototipos.
class Usuario {
    constructor(nombre,seguidores,rango) {
        this.nombre = nombre;
        this.seguidores = seguidores;
        this.rango = rango;
    }
    sumarSeguidor(){
        return this.seguidores += 1;
    }
    verEstadisticas(){
        return `Hola ${this.nombre} tienes ${this.seguidores} y su rango es ${this.rango}`;
    }
}

const elusuario = new Usuario('22matutex22',300,'linuxero');

console.log(elusuario);

class Moderador extends Usuario{
    constructor(nombre,seguidores,rango,permisos){
        super(nombre,seguidores,rango);
        this.permisos = permisos;
    }

    verModerador(){
        return `Hola ${this.nombre} tienes ${this.seguidores} y tu rango es ${this.rango} recuerda tenes permiso de ${this.permisos}`;
    }
}

const user = new Moderador('22matutex22',400,'taringo','Moderador');

console.log(user);