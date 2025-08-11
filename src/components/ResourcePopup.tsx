import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { EnhancedResource } from '../types';
import { theme } from '../utils/theme';

interface ResourcePopupProps {
  isVisible: boolean;
  onClose: () => void;
  resources: EnhancedResource[];
  taskTitle: string;
}

const { width, height } = Dimensions.get('window');

const ResourcePopup: React.FC<ResourcePopupProps> = ({
  isVisible,
  onClose,
  resources,
  taskTitle,
}) => {
  console.log('ResourcePopup rendered:', { isVisible, resourcesLength: resources.length, taskTitle });

  const handleResourcePress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Could not open the link');
    }
  };

  const handleBookmark = (resource: EnhancedResource) => {
    Alert.alert('Bookmark', `${resource.bookmarked ? 'Removed from' : 'Added to'} bookmarks`);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.8}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Resources for: {taskTitle}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {resources.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="book" size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyText}>No resources available</Text>
            </View>
          ) : (
            resources.map((resource, index) => (
              <View key={resource.id} style={styles.resourceCard}>
                <View style={styles.resourceHeader}>
                  <View style={styles.resourceNumber}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={styles.resourceTitle} numberOfLines={2}>
                      {resource.title}
                    </Text>
                    <Text style={styles.resourceType}>{resource.type.toUpperCase()}</Text>
                  </View>
                  <View style={styles.resourceActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleBookmark(resource)}
                    >
                      <Icon
                        name={resource.bookmarked ? 'bookmark' : 'bookmark-border'}
                        size={20}
                        color={resource.bookmarked ? theme.colors.primary : theme.colors.textSecondary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleResourcePress(resource.url)}
                    >
                      <Icon name="open-in-new" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.resourceDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Icon name="schedule" size={14} color={theme.colors.textSecondary} />
                      <Text style={styles.detailText}>{resource.estimatedReadTime} min</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Icon name="star" size={14} color={theme.colors.warning} />
                      <Text style={styles.detailText}>{resource.rating}/5</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Icon name="trending-up" size={14} color={theme.colors.textSecondary} />
                      <Text style={styles.detailText}>{resource.difficulty}</Text>
                    </View>
                  </View>

                  {resource.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                        <View key={tagIndex} style={styles.tagChip}>
                          <Text style={styles.tagText}>#{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    maxHeight: height * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  content: {
    padding: theme.spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  resourceCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  resourceNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  numberText: {
    color: theme.colors.white,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 'bold',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  resourceType: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  resourceActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
  resourceDetails: {
    marginTop: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  tagText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
  },
});

export default ResourcePopup; 