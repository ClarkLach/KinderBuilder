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

    // Check if the target element is draggable
    if (!targetElement.draggable) {
        // Proceed with drop
        targetElement.appendChild(draggedElement);
    }
}

const nouns = [
    'Hello',
    'World',
    'Goodbye',
    'Welcome',
    'Thank you',
    'Example',
    'Drag',
    'Drop',
    'Element',
    'Target',
    'Container',
    'Div',
    'Text',
    'Data',
    'Attribute',
    'Draggable',
    // Add more items as needed
];

const sight_words = [
    'a',
    'and',
    'away',
    'big',
    'blue',
    'can',
    'come',
    'down',
    'find',
    'for',
    'funny',
    'go',
    'help',
    'here',
    'I',
    'in',
    'is',
    'it',
    'jump',
    'little',
    'look',
    'make',
    'me',
    'my',
    'not',
    'one',
    'play',
    'red',
    'run',
    'said',
    'see',
    'the',
    'three',
    'to',
    'two',
    'up',
    'we',
    'where',
    'yellow',
    'you',
    // Add more items as needed
];

// Function to create and append div elements
function createDivs(category, dataList) {
    const container = document.querySelector(category); // bank is the class name of the container

    dataList.forEach((content, index) => { // Loop through dataList to create divs
        const div = document.createElement('div');

        div.id = `word${index+1}`;
        div.className = 'word';
        div.draggable = true;
        div.textContent = content;
        div.setAttribute('ondragstart', 'drag(event)');

        container.appendChild(div);

    });
}

createDivs(".nouns", nouns);
createDivs(".bank", sight_words);