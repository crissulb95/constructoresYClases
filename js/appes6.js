const contenidoBordes = document.querySelector('button.btn');

contenidoBordes.style.borderRadius = '1.2rem';


//CONSTRUCTOR PARA SEGURO

class Seguro {
    constructor(marca, tipo, anio){
        this.marca = marca;
        this.tipo = tipo;
        this.anio = anio;
    }
    
//función para cotizar el precio del seguro según los datos
    cotizarSeguro() {
        const base = 2000;
        let cantidad;
    
        //POR MARCA
        switch(this.marca) {
    /* Americano
        Asiatico
        Europeo */
    
            case "Americano":
                cantidad = base * 1.15;
                break;
            case "Asiatico":
                cantidad = base * 1.05;
                break;
            case "Europeo":
                cantidad = base * 1.35;
                break;
        }
    
        //POR AÑO
        const diferencia = new Date().getFullYear() - this.anio;
        //cada año hay que reducirle un 3% a la cotización
        cantidad -= ((diferencia * 3) * cantidad) / 100;
    
    
        //POR TIPO DE SEGURO
        //SI ES BASICO SE LE SUMA 30%
        //SI ES COMPLETO SE LE SUMA 50%
    
        if(this.tipo === 'basico') {
            cantidad *= 1.3;
        } else {
            cantidad *= 1.5;
        }
    
        return cantidad.toFixed(2);
    }
    
}

//constructor de interfaz, todo lo que se muestre

class Interfaz {
    //Mensaje que se imprime en el HTML
    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
    
        if(tipo === 'error'){
            const resultados = document.querySelector('#resultado div');

            if(resultados !== null) {
            resultados.remove();
            }
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
    
        div.innerHTML = `${mensaje}`;
        
        formulario.insertBefore(div, document.querySelector('.form-group'));
        
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        },3000);
    }

    
//Para mostrar un resumen de la cotización y mostrar carga
    mostrarResultado(seguro, total) {
        const resultado = document.getElementById('resultado');
    
        const div = document.createElement('div');
        div.style.textAlign = 'left';
        div.style.padding = '1rem';
    
        div.innerHTML = `
            <p class="header">Resumen de información:</p>
            - Marca: ${seguro.marca}<br />
            - Año: ${seguro.anio}<br />
            - Tipo: ${seguro.tipo}<br />
            <hr>
            TOTAL : ${total}
        `;
    
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
    
        setTimeout(function() {
            spinner.style.display = 'none';
            setTimeout(function() {
                resultado.appendChild(div);
            },300)
        },3000)
    
    }
    

};

//Event Listener para enviar los datos
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    //Leer el valor de la opción seleccionada
    const marca = document.getElementById('marca');//seleccionando el menu de seleccion(select)
    const marcaSelected = marca.options[marca.selectedIndex].value;
    //Toma el value según el index de la opción seleccionada en el menu^

    //Leer el vallor del anio seleccionado del menu
    const year = document.getElementById('anio');
    const yearSelected = year.options[year.selectedIndex].value;


    //Lee el valor de RADIO BUTTONS
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    console.log(marcaSelected, yearSelected, tipo);

    //Crear instancia de interfaz
    const interfaz = new Interfaz();

    //Si no hay tipo de auto seleccionado entonces
    if(marcaSelected === '') {
        interfaz.mostrarMensaje('Seleccione tipo de carro, revise el formulario e intente nuevamente.','error');
    } else {
        //LIMPIAR PREVIAMENTE SI
        const resultados = document.querySelector('#resultado div');
        if(resultados !== null) {
            resultados.remove();
        }
        //instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSelected, tipo, yearSelected);
        //cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);
        //mostrar Cargando en pantalla
        interfaz.mostrarMensaje('Cotizando...', 'correcto')
        //Mostrar el resultado en pantalla
        interfaz.mostrarResultado(seguro, cantidad);

    }
} );





// CREAR LAS OPCIONES DE UN SELECT VACIO EN EL HTML ORIGINAL
const max = new Date().getFullYear(),//en base a una funcion de fecha, de este anio
    min = max - 20;//seguro de carros hasta de hace 20 anios

const selectYears = document.getElementById('anio');//seleccionas el select
for(let i = max; i >= min; i--) {
    let option = document.createElement('option');//creas un elemento option para el select
    option.value = i; // por cada anio que hayas decidido. Tendra un "valor" igual al anio
    option.innerHTML = i;
    selectYears.appendChild(option);
}