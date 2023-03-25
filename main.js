
// FETCH

const arrayAlimentos = [];
const alimentosBase = "json/alimentos.json";

fetch(alimentosBase)
    .then (respuesta => respuesta.json())
    .then (data => { 
        data.forEach (alimento => {
            arrayAlimentos.push(alimento)
            })
        })
    .catch (error => console.log(error))
    .finally (()=> console.log ("proceso finalizado"));


//Array de mi biblioteca

let biblioteca = [];

//LocalStorage

if(localStorage.getItem("biblioteca")) {
    biblioteca = JSON.parse(localStorage.getItem("biblioteca"));
}


//Buscador

const boton = document.getElementById("boton");
const alimBuscado = document.getElementById("alimBuscado");
const resultado = document.getElementById("resultado");

//Función buscador

const buscador = () =>{
    resultado.innerHTML = '';
    if (alimBuscado.value === ""){
        swal.fire("No ha escrito nada, ingrese el alimento que desea conocer");
    }else{
        const texto = alimBuscado.value.toLowerCase();
        for (let arrayAlimento of arrayAlimentos){
         let nombre = arrayAlimento.nombre.toLowerCase();
         if (nombre.indexOf(texto) !== -1){
             resultado.innerHTML += `
                <div class = "card w-50" >
                  <div class = "card-body">
                      <h2> ${arrayAlimento.nombre} </h2>
                      <p> Tipo de alimento: ${arrayAlimento.familia} </p>
                     <p> Nutriente Primario: ${arrayAlimento.nutrientePrimario} </p>
                     <p> Cada 100gr de alimento aporta: ${arrayAlimento.caloria} kcal </p>
                     <button type="submit" class="btn btn-outline-dark" id = "boton${arrayAlimento.nombre}" >Agregar a mi biblioteca</button>
                  </div>
                </div>`  
                const boton = document.getElementById(`boton${arrayAlimento.nombre}`);
                boton.addEventListener("click", () => {
                    agregarBiblioteca(arrayAlimento.nombre);
                 })   
            } 
        }
        if(resultado.innerHTML === '' ){
            swal.fire("Este alimento no se encuentra en la base de datos");
        }
    }
}
boton.addEventListener("click", buscador);


//Prevención default busqueda
const formulario = document.getElementById("formulario");
formulario.addEventListener ("submit", (e) => {
    e.preventDefault();

})


//Función agregar a biblioteca

const agregarBiblioteca = (nombre) => {
    const alimEnbiblio = biblioteca.find(alimento => alimento.nombre === nombre);
    if (alimEnbiblio){
        swal.fire("Este alimento ya se encuentra en la biblioteca");
    } else{ 
        const alim = arrayAlimentos.find(alimento => alimento.nombre === nombre);
        biblioteca.push(alim);
    }
    
    console.log (biblioteca);

    //LocalStorage: 
    localStorage.setItem("biblioteca", JSON.stringify(biblioteca));
}

//Mostrar biblioteca

const contenedorBiblio = document.getElementById("contenedorBiblio");
const botonBiblio = document.getElementById ("botonBiblio");

botonBiblio.addEventListener("click", () => {
    verBiblio();
})
//Función para ver la biblioteca

const verBiblio = () => {
    contenedorBiblio.innerHTML = "";
    biblioteca.forEach(alimento => {
        const card = document.createElement("div");
        card.classList.add("col-xl-6", "col-md-6", "col-sm-12");
        card.innerHTML = `
            <div class = "card row m-1">
                <div class = "card-body" >
                    <h2> ${alimento.nombre} </h2>
                    <p> Tipo de alimento:  ${alimento.familia} </p>
                    <p> Nutriente Primario: ${alimento.nutrientePrimario} </p>
                    <p> Cada 100gr de alimento aporta: ${alimento.caloria} kcal </p>
                    <button type="submit" class="btn btn-outline-dark" id = "botonEliminar${alimento.nombre}" > Eliminar alimento</button>
                </div>
            </div>`;
        contenedorBiblio.appendChild(card);

        //eliminar alimentos de la biblioteca
        const boton = document.getElementById(`botonEliminar${alimento.nombre}`);
        boton.addEventListener("click", () => {
            eliminoAlimento(alimento.nombre);
        }); 
    });
}

// Función que elimina alimentos de la biblioteca:

const eliminoAlimento = (nombre) => {
    const alimGuardado = biblioteca.find (alimento => alimento.nombre === nombre);
    const indice = biblioteca.indexOf(alimGuardado);
    biblioteca.splice(indice,1);
    verBiblio();

    // localStorage: 
    localStorage.setItem("biblioteca", JSON.stringify(biblioteca));
}

//limpiar biblioteca

const limpiarBiblio = document.getElementById("limpiarBiblio");

limpiarBiblio.addEventListener("click", () => {
    clean();
})

//Función limpiar biblio
const clean = () => {
    biblioteca = [];
    verBiblio();

    //LocalStorage: 
    localStorage.clear();
}
