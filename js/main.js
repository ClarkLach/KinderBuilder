// Word arrays
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
    "all", "am", "an", "and", "are", "as", "at", "ate", "be", "big",
    "black", "brown", "but", "can", "came", "come", "could", "did", "do", "down",
    "eat", "for", "four", "from", "get", "go", "good", "have", "he", "here",
    "how", "I", "in", "into", "is", "it", "know", "like", "little", "look",
    "make", "me", "more", "must", "my", "new", "no", "not", "now", "of",
    "on", "one", "or", "other", "our", "out", "over", "play", "please", "pretty",
    "ran", "ride", "said", "saw", "say", "see", "she", "so", "some", "soon",
    "that", "the", "their", "there", "these", "they", "this", "time", "to", "too",
    "two", "under", "up", "want", "was", "we", "went", "were", "what", "when",
    "where", "white", "who", "will", "with", "yes", "you", "your"
  ];
  

// Function to clear sentence box when clicking trash icon
function clearSentenceBox() {
    const sentenceBox = document.getElementById('sentence-text');
    sentenceBox.innerHTML = '';
}

// Function to make new words always visible
function scrollToBottom() {
    var sentenceDiv = document.getElementById("sentence-text");
    sentenceDiv.scrollTop = sentenceDiv.scrollHeight;
    return;
}

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

// Click action for word divs
document.addEventListener('click', function (event) {
    if (event.target.className === 'word') {
        let word = event.target.cloneNode(true);
        word.classList.add('in-sentence');
        const sentenceBox = document.getElementById('sentence-text');

        if (sentenceBox.children.length === 0) {
            word.textContent = word.textContent.charAt(0).toUpperCase() + word.textContent.slice(1);
        };

        sentenceBox.appendChild(word);
        scrollToBottom();
    }
    if (event.target.className === 'word in-sentence') {
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
            div.className = 'word in-sentence';
            div.textContent = content;
            outputContainer.appendChild(div);
            scrollToBottom();
            searchBox.value = ''; // Clear the search box after creating the div
            searchResults.style.display = 'none';
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

createWordDivsFromArray(".nouns", nouns);
createWordDivsFromArray(".sight", sight_words);
