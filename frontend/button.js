// University of London Project
// Get the references to HTML elements
const addModuleBtn = document.getElementById("addModuleBtn");
const moduleListDiv = document.getElementById("moduleList");

// Event listener for the button click
addModuleBtn.addEventListener("click", addModule);

// The `addModule` function
function addModule() {
    // Prompt user for module details
    const moduleName = prompt("Enter module name:");
    const moduleCode = prompt("Enter module code:");
    const moduleCredits = prompt("Enter credits:");

    if (!moduleName || !moduleCode || !moduleCredits) {
        alert("Please enter all module details.");
        return; // Exit if any input is missing
    }

    // Create a module object
    const newModule = {
        name: moduleName,
        code: moduleCode,
        credits: parseInt(moduleCredits), // Convert to number
    };

    // Store module in localStorage
    let modules = JSON.parse(localStorage.getItem("modules")) || []; // Retrieve existing modules or create empty array
    modules.push(newModule); // Add new module to array
    localStorage.setItem("modules", JSON.stringify(modules)); // Save updated array back to localStorage

    // Display updated list of modules
    displayModules();
}

// Function to display the modules
function displayModules() {
    moduleListDiv.innerHTML = ""; // Clear current list

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
