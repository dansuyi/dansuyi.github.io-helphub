document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://getbible.net/json?passage=random';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.book || !data.book[0] || !data.book[0].chapter || !data.book[0].chapter[0] || !data.book[0].chapter[0].verse || !data.book[0].chapter[0].verse[0]) {
                throw new Error('Invalid data received from the API');
            }

            const verseInfo = data.book[0].chapter[0].verse[0];
            const verseHtml = `
                <h3>${verseInfo.bookname} ${verseInfo.chapter}:${verseInfo.verse}</h3>
                <p>${verseInfo.text}</p>
            `;
            document.getElementById('bibleVerse').innerHTML = verseHtml;
        })
        .catch(error => {
            console.log('Error fetching Bible verse:', error);
            document.getElementById('bibleVerse').innerHTML = `<p>Error fetching Bible verse: ${error.message}</p>`;
        });
});
