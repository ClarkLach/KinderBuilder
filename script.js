function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var targetElement = ev.target;

    // Check if the target element is draggable
    if (!targetElement.draggable) {
        // Proceed with the drop operation
        targetElement.appendChild(draggedElement);
    }
}