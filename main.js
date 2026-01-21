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
const tableroKanban=document.getElementById("tableroKanban");
const datos_guardados = localStorage.getItem("tablero");

if (datos_guardados !==null) {
    formulario.classList.add("oculto");
    const cols = JSON.parse(datos_guardados);//Recupero datos

    dibujarTablero(cols);
}
/*Para ver el localstorage desde el navegador: inspeccionar->application->localstorage y flechita */
//FUNCIONES
//ARREGLAR QUE CUANDO PASA DEL FORMULARIO AL TABLERO, SI REFRESCO SALE EL TABLERO PERO DEBERIA DE SALIR CONFORME SE QUITE EL FORMULARIO Y NO
//SE QUEDE VACIO
function dibujarTablero(datitos){

  datitos.forEach((col,pos)=>{
      const estructura=document.createElement("div");
      estructura.classList.add("columnasBonitas");

      estructura.innerHTML=
       `<h2>${col.titulo}</h2>
       <p>(el max de tareas son ${col.nTareas})</p>`;
       
       //Añado boton en la primera columna
       if(pos===0){
          const tarea=document.createElement("input");
          tarea.type="text";
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
//funcion añadir tareas, otra para mostrar y otra para eliminar 
//function aniadirTarea

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
        console.log("Datos en localStorage:", localStorage.getItem("tablero"));
        //Se esconde el form
        formulario.classList.add("oculto");
        alert("Configuración guardada");
    });
});