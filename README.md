# UoL Grades Calculator


The **UoL Grades Calculator** is the first planned project by University of London worldwide students, organized by the UoL DevSoc initiative. Find us on Slack: #js_project_collab (https://londoncs.slack.com/archives/C08HGJ3QCMV_) (Only accessible to UoL students).

This web-based application aims to assist students in calculating and managing their academic scores throughout their degree. The project is designed to enhance students’ understanding of their academic performance, enabling them to track their grades effectively.

## Table of Contents

-   [Project Goal](#project-goal)
-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Cloning the Repository](#cloning-the-repository)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Contributing](#contributing)
    -   [Finding Tasks](#finding-tasks)
    -   [Contribution Workflow](#contribution-workflow)
-   [Tech Stack (Planned)](#tech-stack-planned)
-   [License](#license)
-   [Contact](#contact)

## Project Goal

To create a user-friendly web application that allows University of London students to input their module grades and calculate their overall degree average based on standard degree structures. The initial focus (Sprint 1) is on core calculation, data entry, and result sharing functionalities.

## Features

This project follows an incremental development approach. The features planned for the **first sprint (April 1st - April 22nd, 2025)** are:

*   **No User Authentication/Sessions:** Core features will be accessible without login in this initial phase.
*   **Form-Based Data Entry:**
    *   Input field for Degree Level (e.g., Level 4, 5, or 6).
    *   Ability to add multiple modules, each with fields for:
        *   Module Name
        *   Grade/Score Achieved
    *   Data should be recorded and potentially displayed in a structured format (e.g., table).
*   **Grade Calculation Feature:**
    *   A dedicated button ("Calculate Average" or similar) to compute the overall degree average grade.
    *   The calculation logic will adhere to standard UoL degree structures.
    *   **Note:** Recognized Prior Learning (RPL) cases are excluded from calculations in this sprint.
*   **Download/Save Feature:**
    *   An option for the user to download a PDF copy of their entered grades and the calculated average.
*   **Email Sharing Feature:**
    *   Functionality to allow users to send their results (entered grades and calculated average) via email, utilizing an SMTP service on the backend.

*Additional features beyond this scope may be considered for future sprints or added within Sprint 1 only after consultation with the Team Lead and ensuring they don't conflict with the future roadmap.*
*(This list will evolve based on discussions and backlog refinement)*

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) (includes npm) 
*   A code editor (e.g., [VS Code](https://code.visualstudio.com/))

### Cloning the Repository

Open your terminal or command prompt and run the following command:

```bash
git clone https://github.com/Uol-Project-Collab/UOL_grades_calculator.git
cd UOL_grades_calculator
```


### Installation
Install the project dependencies. (I'm assuming we will have npm soon, if not this is not needed.)

```bash
npm install
```
(This step can be skipped if a package.json file is not yet present in the project root.)

### Running the Application
Start the development server. 

```bash
frontend\index.html
```
When we use NPM, the following is how we will run the appliation

```bash
npm start
```

This should typically open the application in your default web browser. 


## Contributing
We welcome contributions from all members of the UoL student community! To ensure code quality and maintainability, please follow these guidelines:

### Finding Tasks
Our project backlog, tasks, and bugs are tracked on our Jira board. Please pick up tasks from the backlog:

UGC Project Jira Board - ([UGC Project Board](https://hyderdevop.atlassian.net/jira/software/projects/UGC/boards/34/backlog))

Before starting work on a task, please assign it to yourself in Jira or announce your intention in the #js_project_collab Slack channel to avoid duplication of effort.

### Contribution Workflow
1. NEVER commit directly to the main branch.

2. Create a new branch for your feature or bug fix. Use a descriptive name, e.g.:

	* feature/add-module-input
	* fix/grade-calculation-error
	* docs/update-readme

```bash
git checkout -b feature/your-feature-name
```


3. Make your changes, commit them with clear messages, and push your branch to the remote repository:
```bash
git add .
git commit -m "feat: Implement module input form"
git push origin feature/your-feature-name
```


4. Open a Pull Request (PR) on GitHub from your branch to the main branch.
	- Clearly describe the changes you made in the PR description.
	- Link the relevant Jira issue (e.g., "Closes UGC-123").

5. Request Reviews: Tag relevant team members or mention in Slack that your PR is ready for review.
6. Approval Required: The PR must be approved by the team lead before it can be merged into main.
7. Address Feedback: Make any necessary changes based on the review comments.
8. Merge: Once approved, a maintainer will merge the PR. (IDK, can this be automated?)


## Tech Stack Planned

The technology stack chosen for the initial development sprint is:

*   **Frontend:**
    *   HTML5
    *   CSS3 (Utilizing a framework like Tailwind CSS or Bootstrap is encouraged)
    *   Vanilla JavaScript (or potentially a simple framework if agreed upon by the team)
*   **Backend:**
    *   Node.js
    *   Google Firebase 
*   **Version Control:** Git & GitHub
*   **Project Management:** Jira ([UGC Project Board](https://hyderdevop.atlassian.net/jira/software/projects/UGC/boards/34/backlog))
*   **Communication:** Slack (#js_project_collab) & Discord 


## License
TBD

## Contact
- Project Lead / Maintainers:  
	- Team Lead - Andrés Dávila - andresdavilasanchez@gmail.com
	- admin email: ha365@london.ac.uk || cameronpriceofficial@gmail.com

- Slack Channel: #js_project_collab (https://londoncs.slack.com/archives/C08HGJ3QCMV_) (Only accessible to UoL students). 
- Discord Channel: Link available upon Request
- GitHub Issues: For bug reports and feature requests not yet in Jira.