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
const contenedor=document.getElementById("contenedorcito");

formulario.addEventListener("submit",function(e){
 e.preventDefault();
    const valor=parseInt(numCol.value);
 
   if(isNaN(valor)){
     alert("El campo no puede estar vacio. Por favor introduce un numero de columnas");
     return;
   }
   if(valor < 1){
      alert("La cantidad introducida de columnas no puede ser negativa. introduce un número positivo de columnas");
      return;
   }
  //console.log("num de col: "+valor);
  for(let i=1; i<=valor;i++){
    const titulo=document.createElement("h2");
    titulo.textContent="Columna "+i;
    contenedor.appendChild(titulo);
    //Creacion de inputs
    const inputNombre=document.createElement("input");
    inputNombre.type="text";
    inputNombre.placeholder=`Nombre columna ${i}`;
    inputNombre.id="idCol"+i;
    contenedor.appendChild(inputNombre);
     //Separacion para que se vea aesthetic 
    const separacion=document.createElement("br");
    contenedor.appendChild(separacion);

    const inputTareas=document.createElement("input");
    inputTareas.type="number";
    inputTareas.placeholder="Nº Tareas de la columna";
    inputTareas.id="colTarea"+i;
    inputTareas.min = "1";
    inputTareas.required = true;
    contenedor.appendChild(inputTareas);
  }
    const separacion=document.createElement("br");
    contenedor.appendChild(separacion);

    const botonFinal=document.createElement("input");
    botonFinal.type="submit";
    botonFinal.value="Confirmar";
    botonFinal.classList.add("botoncito");
    contenedor.appendChild(botonFinal);
    //Faltan las validaciones y guardar formulario
});