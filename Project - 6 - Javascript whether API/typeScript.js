// my goal is to get the whether trough city or place name 

// there would be an input as the user input city or place name 
// the data of the users specific entry's city or place named whether should appear 
// What Should Be Included In Whether API Display
// # temprature 
// # wind
// # humidity
// # UV Index 
// # Precip 
 
// http://api.weatherapi.com/v1/current.json?key=14cbafa8a4e343a7b6675447261201&q=London&aqi=no

const input = document.getElementById("search");
const button = document.querySelector("button")
const outputWhether = document.getElementById("outputWhether");
const forcast = document.getElementById("forcast");

async function fetchingData(inputCity) {
    try {
        let responseCurrentWheather = await fetch(`http://api.weatherapi.com/v1/current.json?key=14cbafa8a4e343a7b6675447261201&q=${inputCity}&aqi=no`)
        let dataCurrentWheather = await responseCurrentWheather.json();
        displayData(dataCurrentWheather);
        console.log(dataCurrentWheather);
        
        let lat = dataCurrentWheather.location.lat;
        let lon = dataCurrentWheather.location.lon;

        let APIForcast = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_max&forecast_days=7`
        let responseForcastWheather = await fetch(APIForcast);
        let dataForcastWheather = await responseForcastWheather.json();
        
        console.log(dataForcastWheather);
        displayForcastData(dataForcastWheather);
    

    } catch (error) {
        console.log("couldnt get the whether data");
    }
}

// fetching data from the input 
input.addEventListener("input",(event)=>{
    let inputValue = input.value;
    fetchingData(inputValue);
})

function displayData(displayParam){
    
    let {
        location:{name,region,lat,lon},
        current:{temp_c}
    } = displayParam

    button.addEventListener("click",(event)=>{
        outputWhether.innerHTML = `
            <p>city name : ${name}</p>
            <p>latitute : ${lat}</p>
            <p>longtitute : ${lon}</p>
            <p> temprature : ${temp_c} °C </p>
        `
    })
}

function displayForcastData(displayParam){
    button.addEventListener("click",(event)=>{
    
        let diplsay = displayParam.daily;
        let box = "";

        for (let i = 0; i < 7; i++){
            box += `
            <div class="day-box">
                <p><b>Day ${i+1}</b></p>
                <p>Temp Max: ${diplsay.temperature_2m_max[i]}°C</p>
                <p>Temp Min: ${diplsay.temperature_2m_min[i]}°C</p>
                <p>Humidity: ${diplsay.relative_humidity_2m_max[i]}%</p>
                <p>Rain: ${diplsay.precipitation_sum[i]} mm</p>
            </div>
            `;
        }

        forcast.innerHTML = box;
    })
}