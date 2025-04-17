/**
 * * MessageService class for displaying messages in the UI.
 * * This class handles the creation and management of a message display area in the DOM.
 * * It provides methods to show and clear messages, allowing for user feedback during interactions.
 * * The messages can be styled based on their type (error or success).
 */
class MessageService {
  /**
   * Creates an instance of MessageService.
   * @param {HTMLElement} messageDisplay - The element to display messages.
   */
  constructor(messageDisplay) {
      if (!messageDisplay) {
          messageDisplay = document.createElement("div");
          messageDisplay.id = "messageDisplay";
          document.querySelector(".form-container").prepend(messageDisplay);
      }
      this.messageDisplay = messageDisplay;
  }

  /**
   * Displays a message inline with an optional type for styling.
   * @param {string} message - The message to display.
   * @param {string} [type="error"] - The message type ('error' or 'success').
   */
  showMessage(message, type = "error") {
      this.messageDisplay.textContent = message;
      this.messageDisplay.className = type;
  }

  /**
   * Clears any displayed message.
   */
  clearMessage() {
      this.messageDisplay.textContent = "";
      this.messageDisplay.className = "";
  }
}

// Expose to global scope
window.MessageService = MessageService;