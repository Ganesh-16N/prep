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
import chatGPTService from '../services/chatgptService';

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
      const result = await chatGPTService.getExplanation(query, context);
      
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
            <Icon name="psychology" size={24} color={theme.colors.primary} />
            <Text style={styles.headerTitle}>AI Explanation</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color={theme.colors.textSecondary} />
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
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Getting explanation...</Text>
              </View>
            )}

            {error && (
              <View style={styles.errorContainer}>
                <Icon name="error" size={24} color={theme.colors.error} />
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
                  <Icon name="content-copy" size={16} color={theme.colors.primary} />
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsLabel}>💡 Tips:</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipText}>• Practice implementing this concept</Text>
              <Text style={styles.tipText}>• Read official documentation</Text>
              <Text style={styles.tipText}>• Try building a small project</Text>
              <Text style={styles.tipText}>• Discuss with peers or mentors</Text>
            </View>
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
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  querySection: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  queryLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  queryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  queryText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  contextBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.sm,
  },
  contextText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  explanationSection: {
    marginBottom: theme.spacing.lg,
  },
  explanationLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  loadingText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  errorText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
  },
  explanationCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  explanationText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textPrimary,
    lineHeight: 24,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.xs,
  },
  copyButtonText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.primary,
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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  footerButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
});

export default ExplanationModal; 