import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../utils/theme';
import geminiService from '../services/geminiService';

interface ExplanationModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  query: string;
  context: string;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({
  isVisible,
  onClose,
  title,
  query,
  context
}) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isVisible && query) {
      fetchExplanation();
    }
  }, [isVisible, query]);

  const fetchExplanation = async () => {
    setLoading(true);
    setError('');
    setExplanation('');

    try {
      const result = await geminiService.getExplanation(query, context);
      
      if (result.error) {
        setError(result.error);
      } else {
        setExplanation(result.response);
      }
    } catch (err) {
      setError('Failed to get explanation. Please try again.');
      console.error('Explanation fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchExplanation();
  };

  const handleCopyExplanation = () => {
    // You can implement clipboard functionality here
    Alert.alert('Copied!', 'Explanation copied to clipboard');
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon name="psychology" size={24} color="#60A5FA" />
            <Text style={styles.headerTitle}>AI Explanation</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Query Section */}
          <View style={styles.querySection}>
            <Text style={styles.queryLabel}>What you asked about:</Text>
            <View style={styles.queryCard}>
              <Text style={styles.queryText}>{query}</Text>
              {context && (
                <View style={styles.contextBadge}>
                  <Text style={styles.contextText}>{context}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Explanation Section */}
          <View style={styles.explanationSection}>
            <Text style={styles.explanationLabel}>AI Explanation:</Text>
            
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#60A5FA" />
                <Text style={styles.loadingText}>🤖 Generating comprehensive guide...</Text>
              </View>
            )}

            {error && (
              <View style={styles.errorContainer}>
                <Icon name="error" size={24} color="#F87171" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            )}

            {explanation && !loading && !error && (
              <View style={styles.explanationCard}>
                <Text style={styles.explanationText}>{explanation}</Text>
                <TouchableOpacity 
                  style={styles.copyButton} 
                  onPress={handleCopyExplanation}
                >
                  <Icon name="content-copy" size={16} color="#60A5FA" />
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

        
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={onClose}>
            <Text style={styles.footerButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
    backgroundColor: '#0A0A0A',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  querySection: {
    marginTop: 24,
    marginBottom: 24,
  },
  queryLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  queryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  queryText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 24,
  },
  contextBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },
  contextText: {
    fontSize: 14,
    color: '#60A5FA',
    fontWeight: '600',
  },
  explanationSection: {
    marginBottom: 24,
  },
  explanationLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    fontWeight: '400',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#F87171',
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontWeight: '400',
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  explanationCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  explanationText: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 28,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '400',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    gap: 8,
  },
  copyButtonText: {
    fontSize: 14,
    color: '#60A5FA',
    fontWeight: '500',
  },
  tipsSection: {
    marginBottom: theme.spacing.lg,
  },
  tipsLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  tipsList: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  tipText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
    backgroundColor: '#0A0A0A',
  },
  footerButton: {
    backgroundColor: '#1b1c1c',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExplanationModal; 