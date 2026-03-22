async function getWeather() {
  const city = document.getElementById('city').value;
  const apiKey = 'demo'; // use your own OpenWeatherMap key if available
  const response = await fetch(`https://wttr.in/${city}?format=3`);
  const data = await response.text();
  document.getElementById('result').innerText = data;
}
