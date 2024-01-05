function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log('Element dragged:', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var targetElement = ev.target;

    // Disallow specific areas by id
    if (ev.target.id === "search-box" || 
        ev.target.id === "confirm-button" || 
        ev.target.id === "search-results" || 
        ev.target.id === "search-container" ||
        ev.target.classList.contains('title')) {
        return;
    }

    if (draggedElement.id === "period" && 
        !targetElement.classList.contains('trashcan') &&
        !targetElement.draggable) {

        var copy = draggedElement.cloneNode(true);
        copy.original = true;
        targetElement.appendChild(copy);
        return;
    } else if (targetElement.classList.contains('trashcan') && draggedElement.original) {

        draggedElement.remove();
        return;
    }

    // Check if the target element is draggable
    if (!targetElement.draggable && !targetElement.classList.contains('trashcan')) {
        // Proceed with drop
        targetElement.appendChild(draggedElement);
        return;
    }
};

function clearSentenceBox() {
    const sentenceBox = document.getElementById('sentence-text');
    sentenceBox.innerHTML = '';
};

const nouns = [
    "apple", "ball", "cat", "dog", "elephant",
    "flower", "giraffe", "hat", "ice cream", "jellyfish",
    "kite", "lion", "moon", "nest", "octopus",
    "penguin", "queen", "rainbow", "sun", "turtle",
    "umbrella", "van", "watermelon", "xylophone", "yo-yo",
    "zebra", "acorn", "butterfly", "cloud", "dolphin",
    "fish", "guitar", "house", "igloo", "juice",
    "key", "lamp", "mountain", "notebook", "ocean"
];

const sight_words = [
    "all", "out",
    "am", "are",
    "please", "pretty",
    "at", "ran", "ate", "ride", "be", "saw",
    "black", "say", "brown", "she",
    "but", "so", "came", "soon",
    "did", "that", "do", "there",
    "eat", "they", "four", "this", "get", "too",
    "good", "under",
    "have", "want",
    "he", "was", "into", "well",
    "like", "went", "must", "what",
    "new", "white", "no", "who",
    "now", "will", "on", "with",
    "our", "yes"
];

// Function to create initial word div elements
function createDivs(category, dataList) {
    const container = document.querySelector(category);

    dataList.forEach((content, index) => { // Loop through arrays to create divs
        const div = document.createElement('div');

        div.id = `${category}${index+1}`;
        div.className = 'word';
        div.draggable = true;
        div.textContent = content;
        div.original = true;
        div.setAttribute('ondragstart', 'drag(event)');
        div.setAttribute('ondrag', 'onDrag(event)');
        div.setAttribute('ondragend', 'onDragEnd(event)');

        container.appendChild(div);

    });
}

createDivs(".nouns", nouns);
createDivs(".sight", sight_words);


// Search List
document.addEventListener('DOMContentLoaded', function () {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    const confirmButton = document.getElementById('confirm-button');
    const outputContainer = document.getElementById('sentence-text');

    searchBox.addEventListener('input', function () {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredWords = sight_words.filter(word => word.toLowerCase().startsWith(searchTerm));

        displayResults(filteredWords);
    });

    function displayResults(results) {
        searchResults.innerHTML = '';

        if (results.length > 0) {
            results.forEach(result => {
                const listItem = document.createElement('li');
                listItem.textContent = result;
                listItem.addEventListener('click', function () {
                    searchBox.value = result;
                    searchResults.style.display = 'none';
                });
                searchResults.appendChild(listItem);
            });

            const grandparentDivHeight = searchResults.parentElement.parentElement.clientHeight;
            searchResults.style.maxHeight = (grandparentDivHeight * 0.35) + 'px';
            searchResults.style.overflowY = 'auto';

            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    }

    confirmButton.addEventListener('click', createDiv); // Click button to create div
    searchBox.addEventListener('keydown', function (event) { // Enter to create div
        if (event.key === 'Enter') {
            createDiv();
        }
    });


    function createDiv() {
        const content = searchBox.value;
        if (content.trim() !== '') {
            const div = document.createElement('div');
            const uniqueID = generateUniqueID();

            div.id = uniqueID;
            div.className = 'word';
            div.draggable = true;
            div.textContent = content;
            div.original = true;
            div.setAttribute('ondragstart', 'drag(event)');

            outputContainer.appendChild(div);
            searchBox.value = ''; // Clear the search box after creating the div
        }
    }

    function generateUniqueID() {
        return 'word-' + Date.now();
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
    
    }

    if (sentenceArr.length > 0) {
        alert(sentenceArr.join(' '));
    }
};