let result = document.querySelector('.result');
let nombreCiudad = document.querySelector('#ciudad');
let nombrePais = document.querySelector('#pais'); 
let form = document.querySelector('.getClima');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nombreCiudad.value === '' || nombrePais.value === '') {
        mostrarError('Ambos campos deben estar completos');
        return;
    } 

    llamarApi(nombreCiudad.value, nombrePais.value);
})

function llamarApi(ciudad, pais) {
    const apiKey = 'e83e708f0a139a4b7e78f40fff80286d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

    fetch(url)
         .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                mostrarError('Ciudad no encontrada.');
                limpiarHTML();
            } else {
                mostrarClima(dataJSON);
                console.log(dataJSON);
            }
        })     
}

function mostrarClima(data) {
    let {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    let grados = kelvinHaciaCelcius(temp);
    let min = kelvinHaciaCelcius(temp_min);
    let max = kelvinHaciaCelcius(temp_max);
    let icono = document.querySelector('.iconoClima')
    document.querySelector('.nombreCiudadSeleccionada').innerHTML = `Clima en ${name}`;

    icono.style.display = "block";

    icono.src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`;

    document.querySelector('.temperaturaActual').innerHTML = `${grados}°C`;

    document.querySelector('.temperaturaMax').innerHTML = `Max: ${max}°C`;

    document.querySelector('.temperaturaMin').innerHTML = `Min: ${min}°C`;
}

function mostrarError(mensaje) {
    let alerta = document.createElement('p');
    alerta.classList.add('alertaError');
    alerta.innerHTML = mensaje;
    
    form.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000)
}

function kelvinHaciaCelcius(gradosK) {
    return parseInt(gradosK - 273.15);
}

function limpiarHTML() {
    document.querySelector('.temperaturaMax').innerHTML = `Max: -°C`;

    document.querySelector('.temperaturaMin').innerHTML = `Min: -°C`;

    document.querySelector('.temperaturaActual').innerHTML = `-°C`;

    document.querySelector('.nombreCiudadSeleccionada').innerHTML = `Clima en ----`;
    
    let icono = document.querySelector('.iconoClima')
    icono.style.display = "none";

    

    
}