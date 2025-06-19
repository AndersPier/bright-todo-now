
/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validates that input doesn't contain potentially dangerous content
 */
export const validateInput = (input: string): boolean => {
  if (!input) return true;
  
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b/gi,
    /<object\b/gi,
    /<embed\b/gi,
    /<form\b/gi,
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
};

/**
 * Generates a simple CSRF token for form protection
 */
export const generateCSRFToken = (): string => {
  return btoa(Math.random().toString(36).substring(2, 15) + 
              Math.random().toString(36).substring(2, 15));
};

/**
 * Validates CSRF token
 */
export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};
