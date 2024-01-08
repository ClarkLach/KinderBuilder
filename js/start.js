document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("play");
    const nameInput = document.getElementById("name");

    // Add input event listener to the name input field
    nameInput.addEventListener("input", function() {
        checkForName(nameInput, button);
    });
    
    button.addEventListener("click", function() {
        if (!button.disabled) {
            const userName = nameInput.value;
            localStorage.setItem("userName", userName);
            window.location.href = "index.html";
        }
    });

    // Initial check when the page loads
    checkForName(nameInput, button);
});

function checkForName(nameInput, button) {
    const name = nameInput.value;

    if (name.length > 0) {
        button.disabled = false;
        button.classList.remove("disabled");
        button.classList.add("enabled");
    } else {
        button.disabled = true;
        button.classList.remove("enabled");
        button.classList.add("disabled");
    }
}