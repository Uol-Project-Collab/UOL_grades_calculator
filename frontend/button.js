//University of London Project
// Get references to the HTML elements
const addModuleBtn = document.getElementById("addModuleBtn");
const moduleListDiv = document.getElementById("moduleList");

//  Event listener for the button click
addModuleBtn.addEventListener("click", addModule);

// addModule function
function addModule() {
    // asking the student for the input
    const moduleName = prompt("Enter the module name:");
    const moduleCode = prompt("Enter the module code:");
    const moduleCredits = prompt("Enter credits:");

    if (!moduleName || !moduleCode || !moduleCredits) {
        alert("Please enter all module details.");
        return; // Don't proceed if any data is missing
    }

    // Create a module object
    const newModule = {
        name: moduleName,
        code: moduleCode,
        credits: parseInt(moduleCredits),
    };

    // Storing the localStorage
    let modules = JSON.parse(localStorage.getItem("modules")) || []; // Get existing modules or create empty array
    modules.push(newModule); // Add the new module
    localStorage.setItem("modules", JSON.stringify(modules)); // Save back to localStorage

    // Display the updated list of modules
    displayModules();
}

// Function to display the modules
function displayModules() {
    moduleListDiv.innerHTML = ""; // Clear the existing list

    const modules = JSON.parse(localStorage.getItem("modules")) || [];

    if (modules.length === 0) {
        moduleListDiv.textContent = "No modules added yet.";
        return;
    }

    modules.forEach((module) => {
        const moduleElement = document.createElement("div");
        moduleElement.textContent = `Name: ${module.name}, Code: ${module.code}, Credits: ${module.credits}`;
        moduleListDiv.appendChild(moduleElement);
    });
}

// Initial display when the page loads
displayModules();