const mysql = require('mysql');
const mongo = require('mongodb');
const MySQLEvents = require('@rodrigogs/mysql-events');
const connectionMongo = require('./connection');

const program = async () => {
const connectionMysql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
});

const instance = new MySQLEvents(connectionMysql, {
    startAtEnd: true,
    excludedSchemas: {
        mysql: true,
    },
});

var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

/**
 * Inserta una fila
 * @param object evento
 */
const insertarDB = async (evento) => {
    var nomCollection = evento.table;
    var dataObject = evento.after;
    dataObject._id = mongo.ObjectID(mongoObjectId());
	const db = await connectionMongo('connect',evento.database); //obtenemos la conexion
	db.collection(nomCollection).insertOne(dataObject);
    db.close;
};

/**
 * Actualiza una fila
 * @param object evento
 */
const actualizarDB = async (evento) => {
    var nomCollection = evento.table;
    var idString = evento.before.idmysql;
    var dataObject = evento.after;
    delete dataObject._id;
    var filtro = { "idmysql": idString };
    var updateDoc = { $set: dataObject }

	const db = await connectionMongo('connect',evento.database); //obtenemos la conexion
    db.collection(nomCollection).updateOne(filtro,updateDoc);
    db.close;
};

/**
 * Borra una fila
 * @param object evento
 */
const borrarDB = async (evento) => {
    var nomCollection = evento.table;
    var idString = evento.before.idmysql;
    var filtro = { "idmysql": idString };
	const db = await connectionMongo('connect',evento.database); //obtenemos la conexion
	db.collection(nomCollection).deleteOne(filtro);
    db.close;
};

/**
 * Verifica si existe una collecion
 * @param object evento
 */
const verifyCollection = async (evento) => {
    var nomCollection = evento.table;
	const db = await connectionMongo('connect',evento.database); //obtenemos la conexion
    db.collection(nomCollection).find({}).toArray(( err, result ) => {
        if ( result.length <= 0 ){
            console.log("No existe");
        }else{
            console.log("Existe");
        }
    });
}

await instance.start();

instance.addTrigger({
    name: 'Monitoreo...',
    expression: '*',	//Nombre de la base de datos
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: (event) => {
        //Aqui se recibe el evento de la mysql
        var evento = {
            "database":event.schema,		//Nombre de la base de datos
            "type":event.type,			//Tipo de evento - INSERT, UPDATE, DELETE
            "table":event.table,			//Nombre de la tabla
            "affected":event.affectedColumns,	//Columnas afectadas
            "before":event.affectedRows[0].before,	//Valores Antes | Cuando se realiza un INSERT el valor es undefined
            "after":event.affectedRows[0].after	//Valores Despues | Cuando se realiza un DELETE el valor es undefined
        }

        // Nombre de bd
        const dbName = evento.database;
        //connectionMongo('verify',dbName);
        //verifyCollection(evento);

        switch (evento.type) {
            case 'INSERT':
                insertarDB(evento);
                console.log('Insertado');
                break;
            case 'UPDATE':
                actualizarDB(evento);
                console.log('Actualizado');
                break;
            case 'DELETE':
                borrarDB(evento);
                console.log('Borrado');
                break;
            default:
                break;
        }

    },
});

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
    .then(() => console.log('Esperando eventos en la base de datos...'))
    .catch(console.error);
