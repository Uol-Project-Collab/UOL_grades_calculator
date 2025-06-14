class AverageGrade {
  /**
   * @constructor
   * @param {MessageService} messageService - Service for displaying messages.
   */
  constructor(messageService) {
    this.messageService = messageService;
    this.averageGradeContainer = document.getElementById("averageGrade");
  }

  /**
   * Calls the backend API to retrieve the average grade for the given student.
   * Assumes an endpoint exists at: GET /students/:studentId/average
   * @param {string} studentId 
   * @returns {Promise<number|null>} Resolves with the average grade or null if an error occurs.
   */
  async fetchBackendAverageGrade(studentId) {
    try {
      const response = await axios.get(`http://localhost:3000/api/students/${studentId}/average`);
      // Assume the endpoint returns data as: { averageGrade: value }
      return response.data.averageGrade;
    } catch (error) {
      this.messageService.showMessage("Error fetching average grade from backend.", "error");
      console.error(error);
      return null;
    }
  }

  /**
   * Saves the provided average grade to the backend.
   * Assumes an endpoint exists at: POST /students/:studentId/average 
   * with a JSON body like { averageGrade: <value> }.
   * @param {string} studentId 
   * @param {string|number} average 
   * @returns {Promise<void>}
   */
  async saveAverageGrade(studentId, average) {
    try {
      await axios.put(
        `http://localhost:3000/api/students/${studentId}/average`,
        { averageGrade: average }
      );
      console.log("Successfully saved average grade to backend.");
    } catch (error) {
      this.messageService.showMessage("Error saving average grade to backend.", "error");
      console.error(error);
    }
  }

  /**
   * Locally calculates the average grade from submittedModules.
   * Only includes modules with numeric grades (ignores "RPL" or null values).
   * The weight mapping is:
   *   Level 4: 15, Level 5: 45, Level 6: 75.
   * @returns {string} The calculated average grade (rounded to two decimals) or "N/A" if not calculable.
   */
  calculateAverageGrade() {
    let weightedSum = 0;
    let totalWeight = 0;

    // Use the level keys to apply weight.
    const weightMapping = {
      "4": 15,
      "5": 45,
      "6": 75
    };

    // Iterate using both level and modules array.
    Object.entries(submittedModules).forEach(([level, modulesArray]) => {
      const weight = weightMapping[level] || 1; // Default weight is 1 for unknown levels.
      modulesArray.forEach(module => {
        const grade = module.grade;
        if (grade && grade !== "RPL" && !isNaN(grade)) {
          weightedSum += parseFloat(grade) * weight;
          totalWeight += weight;
        }
      });
    });
    
    return totalWeight ? (weightedSum / totalWeight).toFixed(2) : "N/A";
  }

  /**
   * Renders the average grade to the dashboard container.
   * @param {string|number} average 
   */
  renderAverageGrade(average) {
    if (this.averageGradeContainer) {
      this.averageGradeContainer.textContent = `Average Grade: ${average}`;
    }
  }

  /**
   * Updates the average grade on the dashboard.
   * First, retrieves the average from the backend. Then it calculates the locally computed average.
   * If the backend value is absent or differs from the local calculation, it sends the updated average
   * to the backend for saving. Finally, it renders the final average on the UI.
   * @param {string} studentId 
   */
  async updateAverageGrade(studentId) {
    const backendAverage = await this.fetchBackendAverageGrade(studentId);
    const localAverage = this.calculateAverageGrade();
    
    if (backendAverage !== null) {
      if (backendAverage !== localAverage) {
        averageGrade = localAverage;
        // Update the backend because local calculation is different.
        await this.saveAverageGrade(studentId, averageGrade);
      } else {
        averageGrade = backendAverage;
      }
    } else {
      // If no backend value, use the local average and send it.
      averageGrade = localAverage;
      await this.saveAverageGrade(studentId, averageGrade);
    }

    this.renderAverageGrade(averageGrade);
  }
}

// Expose to global scope
window.AverageGrade = AverageGrade;