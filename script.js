const nouns = [
    "acorn", "apple", "ball", "butterfly",
    "cat", "cloud", "dolphin", "dog",
    "elephant", "fish", "flower", "guitar",
    "giraffe", "hat", "house", "ice cream",
    "igloo", "jellyfish", "juice", "key",
    "kite", "lamp", "lion", "moon",
    "mountain", "nest", "notebook", "ocean",
    "octopus", "penguin", "queen", "rainbow",
    "sun", "turtle", "umbrella", "van",
    "watermelon", "xylophone", "yo-yo", "zebra"
];

const sight_words = [
    "all", "am", "are", "at",
    "ate", "be", "black", "brown",
    "but", "came", "did", "do",
    "eat", "four", "get", "good",
    "have", "he", "into", "like",
    "must", "new", "no", "now",
    "on", "our", "out", "please",
    "pretty", "ran", "ride", "saw",
    "say", "she", "so", "soon",
    "that", "there", "they", "this",
    "too", "under", "want", "was",
    "well", "went", "what", "white",
    "who", "will", "with", "yes"
];

function clearSentenceBox() {
    const sentenceBox = document.getElementById('sentence-text');
    sentenceBox.innerHTML = '';
};

// Function to create initial word div elements
function createWordDivsFromArray(category, dataList) {
    const container = document.querySelector(category);

    dataList.forEach((content) => { // Loop through arrays to create divs
        const div = document.createElement('div');
        div.className = 'word';
        div.textContent = content;
        container.appendChild(div);
    });
}

createWordDivsFromArray(".nouns", nouns);
createWordDivsFromArray(".sight", sight_words);


// Click action for word divs
document.addEventListener('click', function (event) {
    if (event.target.className === 'word' && !(event.target.parentElement.id === 'sentence-text')) {
        const word = event.target.cloneNode(true);
        const sentenceBox = document.getElementById('sentence-text');
        sentenceBox.appendChild(word);
    }
    if (event.target.className === 'word' && event.target.parentElement.id === 'sentence-text') {
        event.target.remove();
    }
});


// Search List
document.addEventListener('DOMContentLoaded', function () {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    const confirmButton = document.getElementById('confirm-button');
    const outputContainer = document.getElementById('sentence-text');

    searchBox.addEventListener('input', function () {
        const searchTerm = searchBox.value.toLowerCase();
        const all_words = nouns.concat(sight_words);
        const filteredWords = all_words.filter(word => word.toLowerCase().startsWith(searchTerm));
        displayResults(filteredWords);
    });

    function displayResults(results) {
        searchResults.innerHTML = '';

        if (results.length > 0) {
            results.forEach(result => {
                const listItem = document.createElement('li');
                listItem.textContent = result;
                listItem.addEventListener('click', function () {
                    searchResults.style.display = 'none';
                    createDiv(result);
                });
                searchResults.appendChild(listItem);
            });

            // Used to limit height of search results proportionally.
            const grandparentDivHeight = searchResults.parentElement.parentElement.clientHeight;
            searchResults.style.maxHeight = (grandparentDivHeight * 0.35) + 'px';
            searchResults.style.overflowY = 'auto';
            searchResults.style.display = 'block';

        } else {
            searchResults.style.display = 'none';
        }
    }

    confirmButton.addEventListener('click', function() { // Click button to create div
        createDiv(searchBox.value); 
    });

    searchBox.addEventListener('keydown', function (event) { // Press enter to create div
        if (event.key === 'Enter') {
            createDiv(searchBox.value);
        }
    });

    function createDiv(word) {
        const content = word;
        if (content.trim() !== '') {
            const div = document.createElement('div');
            div.className = 'word';
            div.textContent = content;
            outputContainer.appendChild(div);
            searchBox.value = ''; // Clear the search box after creating the div
        }
    }

    document.addEventListener('click', function (event) {
        if (!searchResults.contains(event.target)) {
           searchResults.style.display = 'none';
        }
    });
});


function alertTest() {

    let sentenceArr = [];
    let sentence_text = document.getElementById('sentence-text');

    for (let i = 0; i < sentence_text.children.length; i++) {
        // Access each child element
        sentenceArr.push(sentence_text.children[i].innerText); 
    };

    if (sentenceArr.length > 0) {
        alert(sentenceArr.join(' '));
    };
};