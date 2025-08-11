import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { theme } from '../utils/theme';

const ProfileScreen = () => {
  const { user } = useSelector((state: RootState) => state.user as any);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Welcome back, {user?.name || 'User'}!</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Coming Soon</Text>
        <Text style={styles.description}>
          Profile features will be implemented here.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
  },
  content: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
});

export default ProfileScreen; 