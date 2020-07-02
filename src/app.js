require ( '../src/custom.css')
require ( '../src/normalize.css')
require ( '../src/skeleton.css')
//importamos las imagenes 
require ('../img/icono1.png');
require("../img/icono2.png");
require("../img/icono3.png");
require("../img/lupa.png");
require("../img/hero.jpg");

//-------------------------------------------Varibales---------------------------------------
const carrito = document.querySelector("#carrito");
const cursos = document.querySelector("#lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const limpiarCarrito = document.querySelector("#vaciar-carrito");

//Listener
EvenntListeners();
function EvenntListeners() {
  cursos.addEventListener("click", comprarCurso);
  carrito.addEventListener("click", EliminarCarro);
  limpiarCarrito.addEventListener("click", LimpiarCurso);
  document.addEventListener("DOMContentLoaded", leerLStorage);
}
//------------------------------------------Funciones del Even Listener----------------------

//funcion que agraga al carrito
function comprarCurso(e) {
  e.preventDefault();
  //console.log(e.target.classList.contains('fds'))
  //delefation con el cual encontramos el curso
  if (e.target.classList.contains("agregar-carrito")) {
    // const curso = e.target.parentElement.parentElement
    leerDatosCurso(e.target.parentElement.parentElement);
  }
}
//Eliminar el curso del carrito
function EliminarCarro(e) {
  e.preventDefault();
  let curso, id;
  if (e.target.classList.contains("borrar-curso")) {
    // console.log(e.target.parentElement.parentElement)
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement;
    id = curso.querySelector("a").getAttribute("data-id");
  }
  EliminarLocalStorage(id);
}
//Boron de limpiar los cursos
function LimpiarCurso(e) {
  e.preventDefault();
  //------la forma con menos codigo pero es mas lenta
  // listaCursos.innerHTML = ``;
  // return false;
  //---la forma con mas codigo pero mas rapida
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

  //eliminar del LocalStoraje
  vaciarLocalStorage()

  return false;
}
//--------------------------------------------funciones-------------------------------------
function leerDatosCurso(curso) {
  //Creamos Un Objeto con la informacion del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").innerText,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };
  insertarCarrito(infoCurso);
}

//crearemos el html con javascript
function insertarCarrito(curso) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>
    <img src = "${curso.imagen}"></td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td> <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> </td>
    `;
  listaCursos.appendChild(tr);
  //function para guardarlo en el LocalStorage
  GuardarCursoLStorage(curso);
}

//funcion para cargar en el LocalStorage mandando por parametro el curso
function GuardarCursoLStorage(curso) {
  //obtiene el ba;lor de un funcioin con
  let cursos = ObtenerCursoLstorage();
  //el curso seleccionado
  cursos.push(curso);

  localStorage.setItem("cursos", JSON.stringify(cursos));
}

function ObtenerCursoLstorage() {
  let CursosLS;
  //comprobamos si esiste curso en el LocalStorage

  if (localStorage.getItem("cursos") === null) {
    CursosLS = [];
  } else {
    CursosLS = JSON.parse(localStorage.getItem("cursos"));
  }
  return CursosLS;
}

//leemeos los cursos del localStorage
function leerLStorage() {
  let CursosLS;
  CursosLS = ObtenerCursoLstorage();
  CursosLS.forEach(function (curso) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>
    <img src = "${curso.imagen}"></td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td> <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> </td>
    `;
    listaCursos.appendChild(tr);
  });
}

function EliminarLocalStorage(id) {
  let CursosLS = ObtenerCursoLstorage();

  CursosLS.forEach(function (curso, index) {
    if (curso.id === id) {
      CursosLS.splice(index, 1);
    }
  });
  localStorage.setItem("cursos", JSON.stringify(CursosLS));
}

//Boton del limpiar del localStorage
function vaciarLocalStorage(){
localStorage.clear();
}