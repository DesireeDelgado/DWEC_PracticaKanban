/*PRACTICA
hay que hacer un formulario y validar con eventos de formulario 
hay que peidr num columnas 
nombre de cada columna,
y numero max de tareas en cada columna
todo ello con memoria
al añadir tareas, solo se añade en la primera columna, para el resto se arrastran las tareas y ya

osea si no hay info, que salga el form y si ya esta guardada la configuracion dl form lo que aparece es el tablero
*/
const formulario=document.getElementById("formula");
const numCol=document.getElementById("numCol");

formulario.addEventListener("submit",function(e){
 e.preventDefault();
    const valor=numCol.value;
 //numCol no puede ser ni negativo ni vacio
 console.log("num de col: "+valor);
});