document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchMusic(searchTerm);
        }
    });
    async function searchMusic(term) {
        const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayResults(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    function displayResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            const artworkUrl = result.artworkUrl100.replace('100x100bb', '200x200bb'); // Get larger image
            const previewUrl = result.previewUrl;
            resultElement.innerHTML = `
                <img src="${artworkUrl}" alt="${result.trackName}">
                <p>${result.trackName}</p>
                <p>${result.artistName}</p>
                <audio controls>
                    <source src="${previewUrl}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }
});
