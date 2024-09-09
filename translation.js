const welcomeMsg = document.getElementById('welcome-msg');
const searchButton = document.getElementById('search-btn');
const refreshButton = document.getElementById('refresh-btn');

const translations = {
    en: {
        welcomeMsg: 'Explore the collection',
        searchBtn: 'Search',
        refreshBtn: 'Refresh',
    },
    es: {
        welcomeMsg: 'Explorar la colección',
        searchBtn: 'Buscar',
        refreshBtn: 'Recargar',
    }
};

let currentLanguage = 'en'; // Default language

function translatePage(language) {
    currentLanguage = language;

    // Update text content for the specified language
    welcomeMsg.textContent = translations[language].welcomeMsg;
    searchButton.textContent = translations[language].searchBtn;
    refreshButton.textContent = translations[language].refreshBtn;
}

// Initial translation based on the default language
translatePage(currentLanguage);

// Handle language selection from translation language links
document.querySelector('.translation').addEventListener('click', function (event) {
    const selectedLanguage = event.target.getAttribute('data-lang');
    if (selectedLanguage) {
        event.preventDefault(); // Prevent default page reload
        translatePage(selectedLanguage);
    }
});
