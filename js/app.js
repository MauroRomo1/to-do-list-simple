const formularioTarea = document.getElementById("formularioTarea");
const inputTareas = document.getElementById("inputTareas");
const containerCardsTareas = document.getElementById("containerCardsTareas");
let contadorTareas = document.getElementById("contadorTareas");

class Tarea {
  constructor(titulo, tareaLista = false, id = new Date().getTime()) {
    this.titulo = titulo;
    this.tareaLista = tareaLista;
    this.id = id;
  }
}

const tareas = [];

const cargarTareas = (tareas, contenedor) => {
  contenedor.innerHTML = "";
  if (tareas.length > 0) {
    tareas.forEach((tarea) => {
      const card = generarTarjeta(tarea);
      contenedor.insertBefore(card, contenedor.firstChild);
    });
  } else {
    contenedor.innerHTML = `<h4 class="text-center text-muted">Aun no hay tareas en la lista.</h4>`;
  }
};

const generarTarjeta = (tarea) => {
  const card = document.createElement("article");
  card.classList.add("card", "my-3");

  const tareaEstado = tarea.tareaLista
    ? "text-decoration-line-through"
    : "fw-bold";
  const tareaIcono = tarea.tareaLista
    ? "fa-solid fa-circle-check fa-lg"
    : "fa-regular fa-circle-check fa-lg";

  card.innerHTML = `
    <div class="card-body d-flex justify-content-between">
      <h5 class="${tareaEstado}">${tarea.titulo}</h5>
      <div class="d-grid gap-2 d-md-block">
        <button class="btn btn-primary btnCheck" title="Marcar como lista" type="button">
          <i class=" ${tareaIcono} "></i>
        </button>
        <button class="btn btn-danger btnEliminate" title="Eliminar tarea" type="button">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>`;

  return card;
};

const agregarTarea = () => {
  const userTarea = inputTareas.value.trim();
  if (userTarea) {
    const tareaEncontrada = tareas.find(
      (tarea) => tarea.titulo.toLowerCase() === userTarea.toLowerCase()
    );
    if (!tareaEncontrada) {
      tareas.push(new Tarea(userTarea.toLowerCase()));
      cargarTareas(tareas, containerCardsTareas);
      contadorTareas.innerText = tareas.length;
    } else {
      console.log(`La tarea ${tareaEncontrada.titulo} ya existe en la lista.`);
    }
  }
};

formularioTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarTarea();
  inputTareas.value = "";
  inputTareas.focus();
});
