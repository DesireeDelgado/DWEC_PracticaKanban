const formulario=document.getElementById("formula");
const numCol=document.getElementById("numCol");
const contenedor=document.getElementById("contenedorcito");
const mensajes= document.getElementById("mensajes");
const tableroKanban=document.getElementById("tableroKanban");
const datos_guardados = localStorage.getItem("tablero");

if (datos_guardados !==null) {
    formulario.classList.add("oculto");
    mensajes.classList.remove("oculto");
    const cols = JSON.parse(datos_guardados);//Recupero datos

    dibujarTablero(cols);
}
/*Para ver el localstorage desde el navegador: inspeccionar->application->localstorage y flechita */
//FUNCIONES
function dibujarTablero(datitos){
  tableroKanban.innerHTML ="";

  datitos.forEach((col,pos)=>{
      const estructura=document.createElement("div");
      estructura.classList.add("columnasBonitas");

      estructura.innerHTML=
       `<h2>${col.titulo}</h2>
       <p>(el max de tareas son ${col.nTareas})</p>`;

      const zonaTareas=document.createElement("div");
      zonaTareas.classList.add("zonaTareas");
      zonaTareas.id=`zona-${pos}`;

      zonaTareas.addEventListener("dragover", (e) => {//Siempre se tiene que hacer si no no funciona
         e.preventDefault();
      });
      zonaTareas.addEventListener("drop",(e)=>{
         e.preventDefault();
         const origen=e.dataTransfer.getData("colOrigen");
         const posTarea=e.dataTransfer.getData("posTarea");
         const destino=pos;

         moverTarea(origen, destino, posTarea,datitos);
      });

      col.tareas.forEach((texto, posTarea) => {
            const divTarea = document.createElement("div");
            divTarea.classList.add("tareaEstilosa"); 
            divTarea.textContent = texto;
            divTarea.draggable=true;

             divTarea.addEventListener("dragstart",(e)=>{
                e.dataTransfer.setData("colOrigen",pos);
                e.dataTransfer.setData("posTarea",posTarea);
            });

            //Listener para eliminar las tareas con doble click
            divTarea.addEventListener("dblclick",(e)=>{
               eliminarTarea(pos,posTarea,datitos);
            });
            zonaTareas.appendChild(divTarea);
      });
        estructura.appendChild(zonaTareas);
       
       //Añado boton en la primera columna
       if(pos===0){
          const tarea=document.createElement("input");
          tarea.type="text";
          tarea.id="idTarea";
          tarea.placeholder="Nueva tarea...";
          estructura.appendChild(tarea);

          const botonAniadir=document.createElement("submit");
          botonAniadir.textContent="Añadir tarea"
          botonAniadir.classList.add("botonTarea");
          botonAniadir.onclick =()=>{
            aniadirTarea(datitos);
          }
          estructura.appendChild(botonAniadir);
       }
       tableroKanban.appendChild(estructura);
  });
}
function aniadirTarea(datitos){
   const input=document.getElementById("idTarea");
   const valor=input.value;

   const col1=datitos[0];
  //Validaciones
   if(valor === ""){
      alert("La tarea no puede estar vacia");
      return;
   }
   if(col1.tareas.length >= parseInt(col1.nTareas)){
      alert("No se pueden añadir más tareas");
      return;
   }
   col1.tareas.push(valor);//lo añado al array de tareas
   localStorage.setItem("tablero", JSON.stringify(datitos));
   dibujarTablero(datitos);
}
function eliminarTarea(colpos, posTarea, datitos){
    datitos[colpos].tareas.splice(posTarea, 1);
    //Actualizo el localStorage sin la tarea borrada
    localStorage.setItem("tablero", JSON.stringify(datitos));
    dibujarTablero(datitos);
}
function moverTarea(origen, destino, posTarea, datitos){
   if(origen === destino){
       return;
   }
   const columnaDestino=datitos[destino];
   const textoTarea= datitos[origen].tareas[posTarea];//cojo la tarea seleccionada antes de borrar

   if(columnaDestino.tareas.length >= parseInt(columnaDestino.nTareas)){
      alert("No se pueden mover más tareas a esta columna");
      return;
   }

   datitos[origen].tareas.splice(posTarea,1);//Elimino de la columna original los datos
   columnaDestino.tareas.push(textoTarea);
   localStorage.setItem("tablero",JSON.stringify(datitos));
   dibujarTablero(datitos);
}

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
    //Validaciones
    botonFinal.addEventListener("click",function(e){
        e.preventDefault();

        let columnas=[];

        for(let i=1;i<=valor;i++){
            const nombre_col=document.getElementById("idCol"+i).value;
            const tareas=document.getElementById("colTarea"+i).value;

          if(nombre_col.trim()===""){
              alert(`Debes introducir un nombre en la columna ${i}`);
              return;
          }
          if(tareas==="" || parseInt(tareas)<1){
              alert(`El numero de tareas de la columna ${i} debe ser superior a 0`);
              return;
          }
          const columna={
             "id":i,
             "titulo":nombre_col,
             "nTareas":tareas,
             "tareas":[]
          }; 
          columnas.push(columna);
        }
        //Guardar datitos
        localStorage.setItem("tablero", JSON.stringify(columnas));
        //console.log("Datos en localStorage:", localStorage.getItem("tablero"));
        //Se esconde el form
        formulario.classList.add("oculto");
        alert("Configuración guardada");
        dibujarTablero(columnas);
        mensajes.classList.remove("oculto");
    });
});