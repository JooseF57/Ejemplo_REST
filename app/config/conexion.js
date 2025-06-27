const mongoose = require ("mongoose")
const CONFIG = require ('./configuracion')

module.exports={
    conection : null,
    connect : ()=>{  //todo el proceso que se hace abajo se guarda en la variable connect 
        if (this.conection) return this.conection  //pregunta si ya tiene una colecicon, sino retorna una reconexion que se conecta en el archivo CONFIG DB
        return mongoose.connect(CONFIG.DB)  //manda una cosa y espera la respuesta
        .then(conn =>{              //en el then es la respuesa, que es guardada en la variable conn
            this.conection = conn   //asigna la conexion a la variable conn
            console.log('La conexion se realizo con exito')

        })
        .catch(e => console.log ('error en la conexion', e))   //manda respuesta errona si es que no se escucha la peticion al servidor
    }
}