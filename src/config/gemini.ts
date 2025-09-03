// Gemini API Configuration
// Instructions for setting up Google Gemini API

export const GEMINI_CONFIG = {
  // Get your free API key from: https://makersuite.google.com/app/apikey
  API_KEY_URL: 'https://makersuite.google.com/app/apikey',
  
  // Free tier limits (as of 2024)
  FREE_TIER_LIMITS: {
    requestsPerMinute: 60,
    requestsPerDay: 1500,
    model: 'gemini-pro'
  },
  
  // Setup instructions
  SETUP_INSTRUCTIONS: [
    '1. Go to https://makersuite.google.com/app/apikey',
    '2. Sign in with your Google account',
    '3. Click "Create API Key"',
    '4. Copy the generated API key',
    '5. Add it to your environment variables as GEMINI_API_KEY',
    '6. Or set it programmatically using geminiService.setApiKey(yourKey)'
  ]
};

// Helper function to validate API key format
export const validateApiKey = (apiKey: string): boolean => {
  // Gemini API keys are typically long alphanumeric strings
  return apiKey.length > 20 && /^[A-Za-z0-9_-]+$/.test(apiKey);
};

// Helper function to get setup status
export const getSetupStatus = (apiKey: string): {
  isConfigured: boolean;
  message: string;
  needsSetup: boolean;
} => {
  if (!apiKey) {
    return {
      isConfigured: false,
      message: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.',
      needsSetup: true
    };
  }

  if (!validateApiKey(apiKey)) {
    return {
      isConfigured: false,
      message: 'Invalid API key format. Please check your Gemini API key.',
      needsSetup: true
    };
  }

  return {
    isConfigured: true,
    message: 'Gemini API is properly configured and ready to use.',
    needsSetup: false
  };
}; 