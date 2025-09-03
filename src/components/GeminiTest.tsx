import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { theme } from '../utils/theme';
import geminiService from '../services/geminiService';
import { getSetupStatus } from '../config/gemini';

const GeminiTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testGeminiAPI = async () => {
    setLoading(true);
    setTestResult('');

    try {
      // Check if API is configured
      const status = getSetupStatus(geminiService.isConfigured() ? 'configured' : '');
      
      if (!status.isConfigured) {
        setTestResult(`❌ ${status.message}`);
        return;
      }

      // Test the API with a simple query
      const result = await geminiService.getExplanation('What is JavaScript?', 'JavaScript');
      
      if (result.error) {
        setTestResult(`❌ Error: ${result.error}`);
      } else {
        setTestResult(`✅ Success! Response: ${result.response.substring(0, 100)}...`);
      }
    } catch (error) {
      setTestResult(`❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const showSetupInstructions = () => {
    Alert.alert(
      'Gemini API Setup',
      '1. Go to https://makersuite.google.com/app/apikey\n2. Create an API key\n3. Set GEMINI_API_KEY environment variable\n4. Or use geminiService.setApiKey() in App.tsx',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gemini API Test</Text>
      
      <TouchableOpacity 
        style={styles.testButton} 
        onPress={testGeminiAPI}
        disabled={loading}
      >
        <Text style={styles.testButtonText}>
          {loading ? 'Testing...' : 'Test Gemini API'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.setupButton} 
        onPress={showSetupInstructions}
      >
        <Text style={styles.setupButtonText}>Setup Instructions</Text>
      </TouchableOpacity>

      {testResult ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{testResult}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  testButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    textAlign: 'center',
  },
  setupButton: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  setupButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  resultText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textPrimary,
    lineHeight: 18,
  },
});

export default GeminiTest; 