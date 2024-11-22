const headerTag = document.querySelector('h1')
const minTemp = document.querySelector('#temp_min')
const maxTemp = document.querySelector('#temp_max')
const input = document.querySelector('input')
const btn = document.querySelector('button')
const apiKey = '846a28940cd55bb2bd0c9395f07506ce'

async function fetchApi(city) {
	try {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
		let response = await fetch(url)
		let data = await response.json()

		if (data.cod === "404") { 
			document.querySelector('.city').innerHTML = `City not found. Please try again.`
			return
		}
		document.querySelector('.city').innerHTML = `Weather in ${data.name}`
		headerTag.innerHTML = `${data.main.temp}°C`
		maxTemp.innerHTML = `Maximum temperature is ${data.main.temp_max}°C`
		minTemp.innerHTML = `Minimum temperature is ${data.main.temp_min}°C`
		document.querySelector('#pressure').innerHTML = `Pressure is ${data.main.pressure} hPa`
		document.querySelector('.humidity-1').innerHTML = `Humidity: ${data.main.humidity}%`
		document.querySelector('#grnd_level').innerHTML = `Ground level is ${data.main.grnd_level || 'N/A'}`
		document.querySelector('#sea_level').innerHTML = `Sea level is ${data.main.sea_level || 'N/A'}`
		document.querySelector('.wind').innerHTML = `Wind speed: ${data.wind.speed} km/hr`

		const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
		const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString()
		document.querySelector('#sunrise').innerHTML = `Sunrise: ${sunriseTime}`
		document.querySelector('#sunset').innerHTML = `Sunset: ${sunsetTime}`
		
	} catch (error) {
		console.log("Error fetching weather data:", error)
	}
}

btn.addEventListener('click', () => {
	fetchApi(input.value)
})

fetchApi("Delhi")
