# Gemini API Integration Setup

This guide will help you set up Google's free Gemini API for AI explanations in your React Native app.

## 🚀 Quick Setup

### 1. Get Your Free API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure the API Key

#### Option A: Environment Variables (Recommended)
Add to your `.env` file:
```bash
GEMINI_API_KEY=your_api_key_here
```

#### Option B: Programmatic Setup
In your app initialization:
```typescript
import geminiService from './src/services/geminiService';

// Set the API key
geminiService.setApiKey('your_api_key_here');
```

### 3. Test the Integration

The AI explanation feature will now work in your TaskCard components. When users tap the psychology icon, they'll get real AI explanations from Google's Gemini model.

## 📊 Free Tier Limits

- **60 requests per minute**
- **1,500 requests per day**
- **Model**: gemini-pro (latest)

## 🔧 Features

- ✅ Real AI explanations using Google's Gemini model
- ✅ Fallback to mock responses if API fails
- ✅ Context-aware explanations (JavaScript, React, etc.)
- ✅ Error handling and retry functionality
- ✅ Concise, educational responses

## 🛠️ Technical Details

### Files Modified/Created:
- `src/services/geminiService.ts` - Main Gemini API service
- `src/components/ExplanationModal.tsx` - Updated to use Gemini
- `src/config/gemini.ts` - Configuration and validation helpers
- `TaskCard.tsx` - Already integrated, no changes needed

### API Endpoint:
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure you've set the `GEMINI_API_KEY` environment variable
- Or use `geminiService.setApiKey()` method

### "Invalid API key format" error
- Check that your API key is copied correctly
- Gemini API keys are typically long alphanumeric strings

### Network errors
- Check your internet connection
- Verify the API key is valid
- Check if you've exceeded free tier limits

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for production
- The free tier is sufficient for most development and small-scale usage

## 📱 Usage in App

Users can now:
1. Tap the psychology icon (🧠) on any task card
2. Get instant AI explanations for programming concepts
3. Copy explanations to clipboard
4. Retry if there are any issues

The explanations are tailored to the task's category (JavaScript, React, DSA, etc.) and provide educational, concise responses. 