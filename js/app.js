const formularioTarea = document.getElementById("formularioTarea");
const inputTareas = document.getElementById("inputTareas");
const containerCardsTareas = document.getElementById("containerCardsTareas");
const containerTareasRealizadas = document.getElementById(
  "containerTareasRealizadas"
);
let contadorTareas = document.getElementById("contadorTareas");

class Tarea {
  constructor(titulo, marcada = false, id = new Date().getTime()) {
    this.titulo = titulo;
    this.marcada = marcada;
    this.id = id;
  }
}

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const cargarTareas = (tareas, contenedor) => {
  contenedor.innerHTML = "";
  if (tareas.length > 0) {
    tareas.forEach((tarea) => {
      const card = generarTarjeta(tarea);
      contenedor.insertBefore(card, contenedor.firstChild);
    });
  } else {
    contenedor.innerHTML = `<h5 class="text-center text-muted">Aun no hay tareas en la lista.</h5>`;
  }
};

const eliminarTarea = (id) => {
  const index = tareas.findIndex((tarea) => tarea.id === id);
  if (index !== -1) {
    tareas.splice(index, 1);
    actualizarTareas();
  }
};

const marcarComoReady = (id) => {
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (tarea) {
    tarea.marcada = !tarea.marcada;
    actualizarTareas();
  }
};

const generarTarjeta = (tarea) => {
  const card = document.createElement("article");
  card.classList.add("card", "my-3");

  const tareaEstado = tarea.marcada
    ? "text-decoration-line-through"
    : "tareaNota";
  const tareaIcono = tarea.marcada
    ? "fa-solid fa-circle-check fa-lg"
    : "fa-regular fa-circle-check fa-lg";

  card.innerHTML = `
    <div class="card-body d-flex justify-content-between">
      <h6 class="${tareaEstado}">${tarea.titulo}</h6>
      <div class="d-grid gap-2 d-md-block">
        <button class="btn btnBg" id="btnMarcar" title="Marcar como lista" type="button">
          <i class="${tareaIcono}"></i>
        </button>
        <button class="btn btnEliminar" id="btnEliminate" title="Eliminar tarea" type="button">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>`;

  const btnMarcar = card.querySelector("#btnMarcar");
  const btnEliminar = card.querySelector("#btnEliminate");

  btnEliminar.addEventListener("click", () => {
    eliminarTarea(tarea.id);
  });

  btnMarcar.addEventListener("click", () => {
    marcarComoReady(tarea.id);
  });

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
      actualizarTareas();
    } else {
      Swal.fire({
        title: `<h5 class="text-center text-muted">La tarea "${tareaEncontrada.titulo}" ya existe en la lista.</h5>`,
        confirmButtonColor: "#6610f2",
      });
    }
  }
};

const actualizarTareas = () => {
  localStorage.setItem("tareas", JSON.stringify(tareas));
  cargarTareas(
    tareas.filter((tarea) => !tarea.marcada),
    containerCardsTareas
  );
  cargarTareas(
    tareas.filter((tarea) => tarea.marcada),
    containerTareasRealizadas
  );
  contadorTareas.innerText = tareas.filter((tarea) => !tarea.marcada).length;
};

formularioTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarTarea();
  inputTareas.value = "";
  inputTareas.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  cargarTareas(
    tareas.filter((tarea) => !tarea.marcada),
    containerCardsTareas
  );
  cargarTareas(
    tareas.filter((tarea) => tarea.marcada),
    containerTareasRealizadas
  );
  contadorTareas.innerText = tareas.filter((tarea) => !tarea.marcada).length;
});
