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

async function fetchingData(inputCity) {
    try {
        let responseCurrentWheather = await fetch(`http://api.weatherapi.com/v1/current.json?key=14cbafa8a4e343a7b6675447261201&q=${inputCity}&aqi=no`)
        let dataCurrentWheather = await responseCurrentWheather.json();
        displayData(dataCurrentWheather);
    
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