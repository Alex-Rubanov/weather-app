const API_KEY_ACCESS = '084dd069bebb283d4a66420175e1de83';

const api = {
    key: API_KEY_ACCESS,
    base: 'https://api.openweathermap.org/data/2.5/',
    units: 'metric'
};

const locationInput = document.querySelector('.search-box');
const currentDate = new Date();


function dateBuilder(data) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];

    const day = days[data.getDay()];
    const date = data.getDate();
    const month = months[data.getMonth()];
    const year = data.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

const locationData = {
    city: 'London',
    country: 'GB',
    time: dateBuilder(currentDate),
    temp: 15,
    descr: 'Sunny',
    mintemp: 13,
    maxtemp: 16
};

const saveLocationData = () => {
    localStorage.setItem('locationData', JSON.stringify(locationData));
};

const render = () => {
    const parentNode = document.querySelector('main');
    let data = localStorage.getItem('locationData');
    data = JSON.parse(data) || locationData;

    parentNode.innerHTML = `
    <section class="location">
        <div class="location-city">${data.city}, ${data.country}</div>
        <div class="location-date">${data.time}</div>
    </section>
    <section class="temperature">
        <div class="temperature-current">${data.temp}<span>&#176c</span></div>
        <div class="temperature-descr">${data.descr}</div>
        <div class="temperature min-max">${data.mintemp}&#176c / ${data.maxtemp}&#176c</div>
    </section>    
    `;
};

render();

locationInput.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        const location = setLocation(locationInput);
        getResults(location);
    }
});

const setLocation = (input) => {
    const query = input.value;
    input.value = '';

    return query; 
};

const getResults = async (location) => {
    await fetch(`${api.base}weather?q=${location}&appid=${api.key}&units=${api.units}`)
        .then(data => data.json())
        .then(json => {
            return displayResults(json);
        });
};


const displayResults = (data) => {
    locationData.city = data.name;
    locationData.country = data.sys.country;
    locationData.time = dateBuilder(currentDate);
    locationData.temp = Math.round(data.main.temp);
    locationData.descr = data.weather[0].main;
    locationData.mintemp = Math.round(data.main.temp_min);
    locationData.maxtemp = Math.round(data.main.temp_max);

    saveLocationData();
    render();
};
