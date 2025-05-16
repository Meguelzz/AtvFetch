const form = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "43fe33ff1a565e532629eef4c43fb07b";

form.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return showError('Informe uma cidade');
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => res.ok ? res.json() : Promise.reject('Cidade não encontrada'))
    .then(data => {
      const grausC = (data.main.temp - 273.15).toFixed(1);
      const emoji = getEmoji(data.weather[0].id);
      card.innerHTML = `
        <h1>${data.name}</h1>
        <p>${grausC}°C</p>
        <p>Umidade: ${data.main.humidity}%</p>
        <p>${data.weather[0].description}</p>
        <p>${emoji}</p>
      `;
      card.style.display = 'flex';
    })

    .catch(showError);
});

function getEmoji(id) {
  if (id === 800) return '☀';
  if (id >= 200 && id < 700) return '🌧';
  if (id >= 700 && id < 800) return '🌫';
  return '☁';
}

function showError(msg) {
  card.innerHTML = `<p class="errorDisplay">${msg}</p>`;
  card.style.display = 'flex';
}