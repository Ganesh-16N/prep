import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

interface SkeletonLoaderProps {
  type?: 'home' | 'task' | 'category';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'home' }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderHomeSkeleton = () => (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.headerSkeleton}>
        <View style={styles.greetingSkeleton}>
          <View style={[styles.skeletonLine, { width: '60%', height: 24 }]} />
          <View style={[styles.skeletonLine, { width: '40%', height: 16, marginTop: 8 }]} />
        </View>
        <View style={[styles.skeletonCircle, { width: 40, height: 40 }]} />
      </View>

      {/* Progress Section Skeleton */}
      <View style={styles.sectionSkeleton}>
        <View style={[styles.skeletonLine, { width: '40%', height: 20 }]} />
        <View style={styles.progressCardsSkeleton}>
          {[1, 2, 3].map((_, index) => (
            <View key={index} style={styles.progressCardSkeleton}>
              <View style={[styles.skeletonCircle, { width: 32, height: 32 }]} />
              <View style={[styles.skeletonLine, { width: '60%', height: 20 }]} />
              <View style={[styles.skeletonLine, { width: '80%', height: 14 }]} />
            </View>
          ))}
        </View>
        <View style={styles.progressBarSkeleton}>
          <View style={[styles.skeletonLine, { width: '100%', height: 8, borderRadius: 4 }]} />
          <View style={[styles.skeletonLine, { width: '30%', height: 14, marginTop: 8 }]} />
        </View>
      </View>

      {/* Category Section Skeleton */}
      <View style={styles.sectionSkeleton}>
        <View style={[styles.skeletonLine, { width: '50%', height: 20 }]} />
        <View style={styles.categoryCardsSkeleton}>
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={styles.categoryCardSkeleton}>
              <View style={[styles.skeletonLine, { width: '80%', height: 16 }]} />
              <View style={[styles.skeletonLine, { width: '60%', height: 14 }]} />
              <View style={[styles.skeletonLine, { width: '70%', height: 14 }]} />
            </View>
          ))}
        </View>
      </View>

      {/* Today's Focus Skeleton */}
      <View style={styles.sectionSkeleton}>
        <View style={[styles.skeletonLine, { width: '45%', height: 20 }]} />
        {[1, 2].map((_, index) => (
          <View key={index} style={styles.taskCardSkeleton}>
            <View style={styles.taskHeaderSkeleton}>
              <View style={styles.taskTitleSkeleton}>
                <View style={[styles.skeletonLine, { width: '70%', height: 16 }]} />
                <View style={[styles.skeletonLine, { width: '50%', height: 14 }]} />
              </View>
              <View style={[styles.skeletonCircle, { width: 24, height: 24 }]} />
            </View>
            <View style={styles.taskMetaSkeleton}>
              <View style={[styles.skeletonLine, { width: '20%', height: 12 }]} />
              <View style={[styles.skeletonLine, { width: '15%', height: 12 }]} />
              <View style={[styles.skeletonLine, { width: '25%', height: 12 }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTaskSkeleton = () => (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <View key={index} style={styles.taskCardSkeleton}>
          <View style={styles.taskHeaderSkeleton}>
            <View style={styles.taskTitleSkeleton}>
              <View style={[styles.skeletonLine, { width: '80%', height: 16 }]} />
              <View style={[styles.skeletonLine, { width: '60%', height: 14 }]} />
            </View>
            <View style={[styles.skeletonCircle, { width: 24, height: 24 }]} />
          </View>
          <View style={styles.taskMetaSkeleton}>
            <View style={[styles.skeletonLine, { width: '15%', height: 12 }]} />
            <View style={[styles.skeletonLine, { width: '20%', height: 12 }]} />
            <View style={[styles.skeletonLine, { width: '25%', height: 12 }]} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderCategorySkeleton = () => (
    <View style={styles.container}>
      <View style={styles.headerSkeleton}>
        {/* <View style={[styles.skeletonLine, { width: '40%', height: 24 }]} /> */}
        <View style={styles.statsSkeleton}>
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={styles.statItemSkeleton}>
              <View style={[styles.skeletonLine, { width: '60%', height: 20 }]} />
              <View style={[styles.skeletonLine, { width: '80%', height: 14 }]} />
            </View>
          ))}
        </View>
      </View>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <View key={index} style={styles.taskCardSkeleton}>
          <View style={styles.taskHeaderSkeleton}>
            <View style={styles.taskTitleSkeleton}>
              <View style={[styles.skeletonLine, { width: '70%', height: 16 }]} />
              <View style={[styles.skeletonLine, { width: '50%', height: 14 }]} />
            </View>
            <View style={[styles.skeletonCircle, { width: 24, height: 24 }]} />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <Animated.View style={[styles.overlay, { opacity: shimmerOpacity }]}>
      {type === 'home' && renderHomeSkeleton()}
      {type === 'task' && renderTaskSkeleton()}
      {type === 'category' && renderCategorySkeleton()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  headerSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  greetingSkeleton: {
    flex: 1,
  },
  sectionSkeleton: {
    marginBottom: theme.spacing.xl,
  },
  progressCardsSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  progressCardSkeleton: {
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    rowGap: theme.spacing.xs,
    padding: theme.spacing.md,
    width: (width - theme.spacing.lg * 2 - theme.spacing.md * 2) / 3,
  },
  progressBarSkeleton: {
    marginTop: theme.spacing.md,
  },
  categoryCardsSkeleton: {
    flexDirection: 'row',
    rowGap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  categoryCardSkeleton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    width: 120,
    height: 80,
    justifyContent: 'space-between',
  },
  taskCardSkeleton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  taskHeaderSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  taskTitleSkeleton: {
    flex: 1,
    marginRight: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  taskMetaSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  statItemSkeleton: {
    alignItems: 'center',
    flex: 1,
  },
  skeletonLine: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  skeletonCircle: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
  },
});

export default SkeletonLoader; 