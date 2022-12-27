const API_KEY_ACCESS = '084dd069bebb283d4a66420175e1de83';

const api = {
    key: API_KEY_ACCESS,
    base: 'https://api.openweathermap.org/data/2.5/',
    units: 'metric'
};

const locationInput = document.querySelector('.search-box');



locationInput.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        const location = setLocation(locationInput);
        getResults(location);
    }
});

function setLocation(input) {
    const query = input.value;
    input.value = '';

    console.log(query);
    return query;
    
}

const getResults = async (location) => {
    await fetch(`${api.base}weather?q=${location}&appid=${api.key}&units=${api.units}`)
        .then(data => data.json())
        .then(json => {
            return displayResults(json);
        });
};


function displayResults(data) {
    const city = document.querySelector('.location-city');
    const temperature = document.querySelector('.temperature-current');
    const description = document.querySelector('.temperature-descr');
    const minmaxTemperature = document.querySelector('.temperature .min-max');
    const date = document.querySelector('.location-date');
    const now = new Date();

    city.innerHTML = `${data.name}, ${data.sys.country}`;
    temperature.innerHTML = `${Math.round(data.main.temp)}&#176c`;
    date.textContent = dateBuilder(now);
    description.innerHTML = `${data.weather[0].main}`;
    minmaxTemperature.innerHTML = `${Math.round(data.main.temp_min)}&#176c / ${Math.round(data.main.temp_max)}&#176c`;
}

function dateBuilder(data) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Nobember', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];

    const day = days[data.getDay()];
    const date = data.getDate();
    const month = months[data.getMonth()];
    const year = data.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
