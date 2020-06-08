/* Global Variables */

// Use base URL and key to query API database
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = '&units=metric&APPID=a5246863bd8765d52f9e400107a71cdf';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function to GET Web API data*/
const getWeather = async (baseURL, newZip, apiKey) => {
    const res = await fetch(baseURL + newZip + apiKey);
    try {
        // userData equals to the result of fetch function
        const userData = await res.json();
        document.getElementById('temp').textContent = userData.main.temp
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
    document.getElementById('content').textContent = content

    getWeather(baseURL, newZip,  apiKey)
    .then(function (userData) {
        document.getElementById('date').textContent = newDate
        // add data to POST request
        postData('/add', {'date': newDate, 'temp': userData.main.temp, 'content': content})
    })
}

/* Function to POST data */
postData()

async function postData ( url = '', data = {}) {
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
            return newData;
        }catch(error) {
        console.log("error", error);
        //appropriately handle the error
        }
}
