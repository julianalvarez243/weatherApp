let result = document.querySelector('.result');
let nombreCiudad = document.querySelector('#ciudad');
let nombrePais = document.querySelector('#pais'); 
let form = document.querySelector('.getClima');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nombreCiudad.value === '') {
        mostrarError('Debe ingresar una ciudad.');
        return;
    } 

    llamarApi(nombreCiudad.value);
})

function llamarApi(ciudad) {
    const apiKey = 'e83e708f0a139a4b7e78f40fff80286d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=sp&appid=${apiKey}`;

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
    let {name, main:{temp, feels_like, humidity}, weather:[arr], wind:{speed}} = data;

    let sensacion = kelvinHaciaCelcius(feels_like);
    let grados = kelvinHaciaCelcius(temp);
    let viento = metrosHaciaKilometros(speed);
    let icono = document.querySelector('.iconoClima')

    document.querySelector('.nombreCiudadSeleccionada').innerHTML = `Clima en ${name}`;

    icono.style.display = "block";

    icono.src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`;

    document.querySelector('.temperaturaActual').innerHTML = `${arr.description} ${grados}°C`;

    document.querySelector('.temperaturaSensacion').innerHTML = `Sensacion termica: ${sensacion}°C`;

    document.querySelector('.humedadPorcentaje').innerHTML = `Humedad: ${humidity}%`;

    document.querySelector('.vientoKm').innerHTML = `Viento: ${viento} Km/H`;
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
    document.querySelector('.humedadPorcentaje').innerHTML = `Humedad: -%`;

    document.querySelector('.vientoKm').innerHTML = `Viento: - Km/H`;

    document.querySelector('.temperaturaActual').innerHTML = `-°C`;

    document.querySelector('.nombreCiudadSeleccionada').innerHTML = `Clima en ----`;
    
    let icono = document.querySelector('.iconoClima')
    icono.style.display = "none";
}

function metrosHaciaKilometros(metros) {
    return parseFloat((metros * 3.6).toFixed(2));
}