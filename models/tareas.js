
const Tarea = require('./tarea');

class Tareas{


  _listado = {};

  get listadoArr(){//un getter para retornar un nuevo arreglo

    const listado = []
    //un metodo de Object q me retorna un arreglo con las keys
    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[key]
      listado.push( tarea )
    })

    return listado
  }

  constructor(){
    this._listado = {}
  }

  borrarTarea( id = ''){
    if(this._listado[id]){
      delete this._listado[id]
    }
  }

  crearTareasFromArray( tareas = []){
   //estas 'tareas' no son instancias de nuestra clase sino objetos literales de JS
   tareas.forEach( tarea =>{
     this._listado[tarea.id] = tarea
   })
  }


  crearTarea( desc = ''){
     const tarea = new Tarea(desc)
     this._listado[tarea.id] = tarea
  }

  listadoCompleto(){
    this.listadoArr.forEach( (tarea, i) => {
      const idx = `${i + 1}`.green  ;
      const { desc, completadoEn} = tarea;
      const estado = ( completadoEn )
                          ?'completada'.green : 'pendiente'.red
      console.log(`${ idx } ${ desc } :: ${ estado }`);

    })
  }
  listarPendientesCompletadas( completadas = true){
    console.log()
    let contador = 0

    this.listadoArr.forEach(tarea => {
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn)
        ? 'completada'.green : 'pendiente'.red
      if( completadas){

        if( completadoEn){
          contador += 1
          console.log(`${(contador +'.').green} ${desc} :: ${completadoEn.green}`);
        }
      } else {
        if (!completadoEn) {
          contador += 1
          console.log(`${(contador + '.').red} ${desc}  :: ${estado}`);
        }
      }


    })
  }
  toggleCompletadas( ids = []){
    ids.forEach(  id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
         tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach( tarea => {
      if(!ids.includes(tarea.id)){
         this._listado[tarea.id].completadoEn = null

      }
    })
  }
}


module.exports = Tareas;