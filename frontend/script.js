// Arrays to store module names by level
const modulesByLevel = {
  "4": ["Introduction to Programming 1", "Introduction to Programming 2", "Computational Mathematics", "Discrete Mathematics","How Computers Work","Algorithms and Data Structures","Web Development","Fundamentals of Computer Science"],
  "5": ["Professional Practice for Computer Science", "Algorithms and Data Structures 2", "Computer Security", "Databases, Networks and the Web","Graphics Programming","Object Oriented Programming","Programming with Data","Software Design and Development"],
  "6": ["3D Graphics and Animation", "Advanced Web Development", "Artificial Intelligence", "Data Science","Databases and Advanced Data Techniques","Games Development","Intelligent Signal Processing","Interaction Design","Machine Learning and Neural Networks","Mobile Development","Natural Language Processing","Physical Computing and Internet of Things","Virtual Reality"],
};

// References to HTML elements
const levelsCheckboxGroup = document.getElementById("levelsCheckboxGroup");
const nextStepButton = document.getElementById("nextStep");
const step1Div = document.getElementById("step1");
const step2Div = document.getElementById("step2");
const moduleListDiv = document.getElementById("moduleList");
const submitGradesButton = document.getElementById("submitGrades");

// Handle "Next" button click
nextStepButton.addEventListener("click", () => {

   // Get selected levels from checkboxes
   const selectedLevels = Array.from(levelsCheckboxGroup.querySelectorAll('input[type="checkbox"]:checked'))
                               .map(checkbox => checkbox.value);

   if (selectedLevels.length === 0) {
     alert("Please select at least one level.");
     return;
   }

   // Hide Step 1 and show Step 2
   step1Div.style.display = "none";
   step2Div.style.display = "block";

   
   populateModules(selectedLevels);
});

// Populate dynamically based on selected levels
function populateModules(levels) {

   moduleListDiv.innerHTML = ""; // Clear any existing modules

   levels.forEach((level) => {
     const modules = modulesByLevel[level] || [];
     
     if (modules.length > 0) {
       const levelHeader = document.createElement("h4");
       levelHeader.textContent = `Level ${level}`;
       moduleListDiv.appendChild(levelHeader);

       modules.forEach((moduleName) => {
         const moduleItemDiv = document.createElement("div");
         moduleItemDiv.className = "module-item";

         const label = document.createElement("label");
         label.textContent = moduleName;

         const gradeInput = document.createElement("input");
         gradeInput.type = "number";
         gradeInput.placeholder = "Grade";
         gradeInput.min = "0";
         gradeInput.max = "100";

         const rplCheckbox = document.createElement("input");
         rplCheckbox.type = "checkbox";

         // Disable grade input if RPL is checked
         rplCheckbox.addEventListener("change", () => {
           gradeInput.disabled = rplCheckbox.checked; // Disable/enable grade input
           if (rplCheckbox.checked) gradeInput.value = ""; // Clear grade if RPL is checked
         });

         
         moduleItemDiv.appendChild(label);
         moduleItemDiv.appendChild(gradeInput);
         moduleItemDiv.appendChild(rplCheckbox);

         
         moduleListDiv.appendChild(moduleItemDiv);
       });
     }
   });
}

// event listener for "Submit Grades" button
submitGradesButton.addEventListener("click", () => {

   // Get all grades and RPL from inputs
   const modulesData = Array.from(moduleListDiv.querySelectorAll(".module-item")).map((item) => {
     const labelText = item.querySelector('label').textContent;
     const gradeInput = item.querySelector('input[type="number"]');
     const rplCheckbox = item.querySelector('input[type="checkbox"]');
     return {
       moduleName: labelText,
       grade: rplCheckbox.checked ? "RPL" : gradeInput.value,
     };
   });

   
   const invalidGrades = modulesData.some((data) => data.grade !== "RPL" && (!data.grade || data.grade < 0 || data.grade > 100));

   if (invalidGrades) {
     alert("Please enter valid grades for all non-RPL modules.");
     return;
   }

   
   console.log(modulesData); 
   alert(`Grades submitted successfully:\n${modulesData.map((data) => `${data.moduleName}: ${data.grade}`).join("\n")}`);
   
  
   resetForm();
});

// Reset form to start over
function resetForm() {
   step1Div.style.display = "block";
   step2Div.style.display = "none";
   levelsCheckboxGroup.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
   moduleListDiv.innerHTML = "";
}
