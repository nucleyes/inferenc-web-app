/**
 * This script suppresses specific console warnings that are intentionally ignored
 * 
 * It's loaded via a script tag in the document head to suppress warnings at runtime
 * to avoid cluttering the console or causing build warnings
 */

// Immediately execute when the script loads
(function() {
  if (typeof window !== 'undefined' && typeof console !== 'undefined') {
    // Save a reference to the original console.error function
    const originalError = console.error;
    
    // Override console.error to filter out specific warning patterns
    console.error = function(...args) {
      // Skip warnings about accessibility labels in NextUI components
      if (
        typeof args[0] === 'string' && (
          args[0].includes('visible label') || 
          args[0].includes('aria-label') || 
          args[0].includes('aria-labelledby')
        )
      ) {
        // Suppress the warning
        return;
      }
      
      // Pass through all other errors to the original handler
      return originalError.apply(console, args);
    };
  }
})(); 