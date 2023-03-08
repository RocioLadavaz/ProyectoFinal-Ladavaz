//alimentos base de datos

class Alimento {
    constructor(nombre, familia, nutrientePrimario, caloria){
        this.nombre = nombre;
        this.familia = familia;
        this.nutrientePrimario = nutrientePrimario;
        this.caloria = caloria;
    }
}

const queso = new Alimento ("Queso","Lácteo", "Proteina", 300);
const lenteja = new Alimento ("Lenteja", "Legumbre","Hidrato de carbono", 350);
const garbanzo = new Alimento ("Garbanzo", "Legumbre","Hidrato de carbono", 340);
const tomate = new Alimento ("Tomate", "Fruta", "Vitaminas, minerales y fibra", 50);
const mayonesa = new Alimento ("Mayonesa", "Aderezo", "Grasas", 800);
const aceite = new Alimento ("Aceite", "Grasa", "Acidos grasos", 900);
const pan = new Alimento ("Pan", "Cereal", "Hidrato de carbono", 270);
const banana = new Alimento ("Banana", "Fruta", "Fibra, vitaminas y minerales", 100);
const manzana = new Alimento ("Manzana", "Fruta", "Fibra, vitaminas y minerales", 80);
const pera = new Alimento ("Pera", "Fruta", "Fibra, vitaminas y minerales", 70);
const yogur = new Alimento ("Yogur", "Lácteo", "Proteina", 70);
const carne = new Alimento ("Carne", "Carne","Proteina", 300);
const galletita = new Alimento ("Galletita de Agua", "Cereal", "Hidrato de carbono", 450);
const papa = new Alimento ("Papa", "Verdura", "Hidrato de carbono", 90);
const batata = new Alimento ("Batata", "Verdura", "Hidrato de carbono", 100);
const pepino = new Alimento ("Pepino", "Verdura", "Vitaminas, minerales y fibra", 30);



const arrayAlimentos = [queso, lenteja, garbanzo, tomate, mayonesa, aceite, pan, banana, manzana, pera, yogur, carne, galletita, papa, batata, pepino];

//array de mi biblioteca

let biblioteca = [];

//localStorage

if(localStorage.getItem("biblioteca")) {
    biblioteca = JSON.parse(localStorage.getItem("biblioteca"));
}



//BUSCADOR

const boton = document.getElementById("boton");
const alimBuscado = document.getElementById("alimBuscado");
const resultado = document.getElementById("resultado");

//función buscador

const buscador = () =>{
    resultado.innerHTML = '';
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
    if (resultado.innerHTML === '' ){
        resultado.innerHTML = `<p>Este alimento no se encuentra en la base de datos</p>`
    }    
}
boton.addEventListener("click", buscador);


//funcion agregar a biblioteca

let mensaje = document.getElementById ("mensaje");
const agregarBiblioteca = (nombre) => {
    const alimEnbiblio = biblioteca.find(alimento => alimento.nombre === nombre);
    if (alimEnbiblio){
        mensaje.innerHTML = `<p class= "mensaje">Este alimento ya se encuentra en la biblioteca </p>`;
    } else{ 
        const alim = arrayAlimentos.find(alimento => alimento.nombre === nombre);
    biblioteca.push(alim);
    }
    
    console.log (biblioteca);

    //LocalStorage: 
    localStorage.setItem("biblioteca", JSON.stringify(biblioteca));
}

//mostrar biblioteca

const contenedorBiblio = document.getElementById("contenedorBiblio");
const botonBiblio = document.getElementById ("botonBiblio");

botonBiblio.addEventListener("click", () => {
    verBiblio();
})
//funcion para ver la biblioteca

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

// función que elimina alimentos de la biblioteca:

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

//función limpiar biblio
const clean = () => {
    biblioteca = [];
    verBiblio();

    //LocalStorage: 
    localStorage.clear();
}