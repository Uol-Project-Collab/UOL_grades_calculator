/**
 * App entry point for the application.
 * Initializes the necessary services and managers for the application to function.
 * This includes setting up the storage service, message service, module manager, and form manager.
 * The DOMContentLoaded event ensures that the script runs after the document is fully loaded.
 * This is crucial for ensuring that all elements are available for manipulation.
 */
document.addEventListener("DOMContentLoaded", () => {
    const storageService = new StorageService();
    const messageDisplay = document.getElementById("messageDisplay");
    const messageService = new MessageService(messageDisplay);
    const moduleManager = new ModuleManager(storageService, messageService);
    const formManager = new FormManager(moduleManager, storageService, messageService);
  
    formManager.init();
});

