require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
         pausa,
         listadoTareasBorrar,
         leerInput,
         confirmar,
         mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

// const { mostrarMenu, pause } = require('./helpers/mensajes');


const main = async() => {//esta funcion se hace segun el autor solo para poder usar el async y el await

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB()

  if(tareasDB){
    //establecer las tareas;
    tareas.crearTareasFromArray(tareasDB)

  }
  // await pausa()

  do {
    opt = await inquirerMenu();
    console.log({ opt });

    switch (opt) {
      case '1':
        //crear opcion
        const desc = await leerInput('Descripcion: ')
        tareas.crearTarea( desc )
      break;

      case '2':
        tareas.listadoCompleto()
        // console.log(tareas.listadoArr);
      break;

      case '3'://listar completadas
        tareas.listarPendientesCompletadas(true)
      break;
      case '4'://listar pendientes
        tareas.listarPendientesCompletadas(false)
      break;
      case '5':
       const ids = await mostrarListadoCheckList(tareas.listadoArr)
       tareas.toggleCompletadas(ids)
      break;

      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);//esperar el await de una tarea asincrona
        if(id !== '0'){
          const ok = await confirmar('seguro que desea borrar');
          if( ok ){
            tareas.borrarTarea( id )
            console.log('tarea borrada correctamente');
          }
        }
        break;


    }

    guardarDB(tareas.listadoArr)

    await pausa()
  } while (opt !== '0')


  // pause()
}

main()