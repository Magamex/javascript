const { MongoClient } = require('mongodb');

// Nombre de bd
//const dbName = 'pruebasincro';
// Conexión URL (estas corriendo en local :D)
	const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, {
	useUnifiedTopology: true
});

module.exports = async (typeA,dbName) => {
	if(typeA == 'connect'){
		// Conectamos al servidor
		await client.connect();
		return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
	}else if(typeA == 'verify'){
		client.connect()
		.then(
			(client) => client.db().admin().listDatabases(),
		)
		.then((dbs)=>{
			const database = dbs.databases.find((element) => element.name === dbName)

			if(database){
				console.log(`Se encontro la base de datos - ${dbName}`);
			}else{
				console.log(`No se encontro la base de datos - ${dbName}`)
			}
		})
		.catch((error)=> console.log(error))
		.finally(()=>client.close())
	}
};
