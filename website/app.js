/* Global Variables */
// const form = document.querySelector('.app__form');
const icons = document.querySelectorAll('.entry__icon');
// Use base URL and key to query API database
let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
let apiKey = '&units=metric&APPID=a5246863bd8765d52f9e400107a71cdf';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function to GET Web API data*/
const getWeather = async (baseURL, newZip, apiKey) => {
    const res = await fetch(baseURL + newZip + apiKey);
    try {
        // userData equals to the result of fetch function
        const userData = await res.json();
        return userData;
    } catch (error) {
        console.log("error", error);
    }
}

// Create an event listener with a callback function to  execute when clicked
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(baseURL, newZip,  apiKey)
    .then(function (userData) {
        let date = new Date(userData.dt * 1000)
        let date_str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        // add data to POST request
        postData('/add', {'data': date_str, 'temp': userData.main.temp, 'content': content})
    })
    .then(function(){
        updateUI
    })
   
}

/* Function to POST data */
const postData = async ( url = '', data = {}) => {
        console.log(data)
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

        try {
            const newData = await req.json();
            console.log(newData);
            return newData;
        }catch(error) {
        console.log("error", error);
        //appropriately handle the error
        }
}

// Update the UI
const updateUI = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json();
        console.log('TRECIAS')
        // show icons on the page
        icons.forEach(icon => icon.style.opacity = '1');
        // update new entry values
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    }catch(error) {
        console.log("error", error);
    }
}