// Define API endpoint and DOM elements
const googleSheet = 'https://script.google.com/macros/s/AKfycbykdF_EWqB4gSP7PV1iSJwr1bATagXL4NcWaN_3TJaMcr2KKuMqNMAYGuC_a_aVVvcq/exec'
const display = document.getElementById('display');
const input = document.getElementById('input');
const searchBtn = document.getElementById('search-btn');
const refreshBtn = document.getElementById('refresh-btn');

let apiData = [];

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    apiData = data;
    filterData(input.value);
  } catch (error) {
    window.alert(error.message);
  }
}

getData(googleSheet);

function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterData(query) {
  if (query) {
    const searchTerms = query.toLowerCase().split(/\s+/).map(term => removeDiacritics(term));

    const filteredData = apiData.filter(allData => { 
      return searchTerms.every(term => {
        return (
          Object.values(allData).some(value => {
            if (value && typeof value === 'string') {
              return removeDiacritics(value.toLowerCase()).includes(term);
            }
            return false;
          })
        );
      });
    });

    displayData(filteredData);
  } else {
    displayData(apiData); 
  }
}

function runSearch() {
    const searchTerms = input.value.trim();
    filterData(searchTerms);
};

// Event listeners for search bar
searchBtn.addEventListener('click', runSearch);
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        runSearch();
    }
});

function displayData(data) {
  let dataDisplay = data.map((object) => {
    return `
<div class="item">
    <div class="item-header">
        <h2><a href="${object.URL}" target="_blank" rel="noopener noreferrer">${object.Resource_Title}</a></h2>
        <p>${object.Institutional_Hosts}</p>
    </div>
    <div class="item-description">
        <p><span class="inline-label">Resource Types: </span>${object.Resource_Types}</p>
        <p><span class="inline-label">Subjects in English: </span>${object.Subjects_in_English}</p>
        <p><span class="inline-label">Materias en Español: </span>${object.Materias_en_Espanol}</p>
        <p><span class="inline-label">Assuntos em Português: </span>${object.Assuntos_em_Portugues}</p>
        <p><span class="inline-label">Languages: </span>${object.Languages}</p>
        <p><span class="inline-label">Countries: </span>${object.Countries}</p>
        <p><span class="inline-label">Time Coverage: </span>${object.Time_Coverage}</p>
        <p><span class="inline-label">Summary: </span>${object.Summary}</p>
    </div>
</div>
    `;
  }).join('');   

  display.innerHTML = dataDisplay;
}

refreshBtn.addEventListener('click', () => {
  input.value = '';
  runSearch();
});