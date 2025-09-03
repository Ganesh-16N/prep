import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { theme } from '../utils/theme';
import geminiService from '../services/geminiService';

const EnhancedGeminiTest: React.FC = () => {
  const [testResults, setTestResults] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState<string | null>(null);

  const testTopics = [
    { name: 'JavaScript', query: 'Explain closures and their practical applications' },
    { name: 'React', query: 'How does React reconciliation work and how to optimize it?' },
    { name: 'DSA', query: 'Implement and explain LRU Cache with time complexity' },
    { name: 'System Design', query: 'Design a scalable URL shortener service' },
    { name: 'Machine Coding', query: 'Implement a parking lot management system' }
  ];

  const testTopic = async (topic: { name: string; query: string }) => {
    setLoading(topic.name);
    setTestResults(prev => ({ ...prev, [topic.name]: '' }));

    try {
      const result = await geminiService.getExplanation(topic.query, topic.name);
      
      if (result.error) {
        setTestResults(prev => ({ 
          ...prev, 
          [topic.name]: `❌ Error: ${result.error}` 
        }));
      } else {
        setTestResults(prev => ({ 
          ...prev, 
          [topic.name]: result.response 
        }));
      }
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [topic.name]: `❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }));
    } finally {
      setLoading(null);
    }
  };

  const testAllTopics = async () => {
    for (const topic of testTopics) {
      await testTopic(topic);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎯 Enhanced Gemini AI Test</Text>
      <Text style={styles.subtitle}>Comprehensive 20+ LPA Preparation Content</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.testAllButton} 
          onPress={testAllTopics}
        >
          <Text style={styles.testAllButtonText}>🧪 Test All Topics</Text>
        </TouchableOpacity>
      </View>

      {testTopics.map((topic) => (
        <View key={topic.name} style={styles.topicContainer}>
          <View style={styles.topicHeader}>
            <Text style={styles.topicName}>📚 {topic.name}</Text>
            <TouchableOpacity 
              style={[
                styles.testButton,
                loading === topic.name && styles.testButtonLoading
              ]} 
              onPress={() => testTopic(topic)}
              disabled={loading === topic.name}
            >
              <Text style={styles.testButtonText}>
                {loading === topic.name ? '⏳ Testing...' : '🚀 Test'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.topicQuery}>Query: {topic.query}</Text>
          
          {testResults[topic.name] && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                {testResults[topic.name].substring(0, 200)}...
              </Text>
              <Text style={styles.resultNote}>
                (Showing first 200 characters - full response available in app)
              </Text>
            </View>
          )}
        </View>
      ))}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>🎯 What's Enhanced:</Text>
        <Text style={styles.infoText}>• 📚 Detailed core concepts</Text>
        <Text style={styles.infoText}>• 💻 Practical code examples</Text>
        <Text style={styles.infoText}>• 🎯 Interview questions</Text>
        <Text style={styles.infoText}>• 🏋️ Practice exercises</Text>
        <Text style={styles.infoText}>• 💡 Best practices</Text>
        <Text style={styles.infoText}>• ⚠️ Common pitfalls</Text>
        <Text style={styles.infoText}>• 📈 Advanced topics for 20+ LPA</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  buttonContainer: {
    marginBottom: theme.spacing.lg,
  },
  testAllButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  testAllButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  topicContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  topicName: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  testButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  testButtonLoading: {
    backgroundColor: theme.colors.warning,
  },
  testButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  topicQuery: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: theme.spacing.sm,
  },
  resultContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  resultText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textPrimary,
    lineHeight: 18,
    fontFamily: 'monospace',
  },
  resultNote: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginTop: theme.spacing.xs,
  },
  infoContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    ...theme.shadows.small,
  },
  infoTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
});

export default EnhancedGeminiTest; 