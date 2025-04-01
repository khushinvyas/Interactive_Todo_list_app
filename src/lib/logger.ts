
/**
 * Logs user actions in the todo list application
 * Acts as our script.js functionality per the requirements
 */

type ActionType = 'add' | 'delete' | 'toggle' | 'load' | 'save';

export const logAction = (action: ActionType, message: string): void => {
  const timestamp = new Date().toLocaleTimeString();
  const logMessage = `[${timestamp}] ${action.toUpperCase()}: ${message}`;
  
  console.log(logMessage);
  
  // Here we could also add additional logging functionality like:
  // - Sending logs to a server
  // - Writing to a file (in a Node.js environment)
  // - Storing logs in localStorage
};
