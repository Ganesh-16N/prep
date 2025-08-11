// Utility functions for handling Date objects in Redux state
import { Task, SerializedTask, EnhancedResource, SerializedEnhancedResource, ReviewSchedule, SerializedReviewSchedule, TaskTimeTracking, SerializedTaskTimeTracking, TimeSession, SerializedTimeSession } from '../types';

export const serializeDate = (date: Date | string | undefined): string | undefined => {
  if (!date) return undefined;
  if (typeof date === 'string') return date;
  return date.toISOString();
};

export const deserializeDate = (dateString: string | undefined): Date | undefined => {
  if (!dateString) return undefined;
  return new Date(dateString);
};

export const serializeEnhancedResource = (resource: EnhancedResource): SerializedEnhancedResource => ({
  ...resource,
  lastUpdated: serializeDate(resource.lastUpdated) || '',
});

export const deserializeEnhancedResource = (resource: SerializedEnhancedResource): EnhancedResource => ({
  ...resource,
  lastUpdated: deserializeDate(resource.lastUpdated) || new Date(),
});

export const serializeTimeSession = (session: TimeSession): SerializedTimeSession => ({
  ...session,
  startTime: serializeDate(session.startTime) || '',
  endTime: serializeDate(session.endTime) || '',
});

export const deserializeTimeSession = (session: SerializedTimeSession): TimeSession => ({
  ...session,
  startTime: deserializeDate(session.startTime) || new Date(),
  endTime: deserializeDate(session.endTime) || new Date(),
});

export const serializeReviewSchedule = (schedule: ReviewSchedule): SerializedReviewSchedule => ({
  ...schedule,
  nextReview: serializeDate(schedule.nextReview) || '',
});

export const deserializeReviewSchedule = (schedule: SerializedReviewSchedule): ReviewSchedule => ({
  ...schedule,
  nextReview: deserializeDate(schedule.nextReview) || new Date(),
});

export const serializeTaskTimeTracking = (tracking: TaskTimeTracking): SerializedTaskTimeTracking => ({
  ...tracking,
  sessions: tracking.sessions.map(serializeTimeSession),
});

export const deserializeTaskTimeTracking = (tracking: SerializedTaskTimeTracking): TaskTimeTracking => ({
  ...tracking,
  sessions: tracking.sessions.map(deserializeTimeSession),
});

export const serializeTaskDates = (task: Task): SerializedTask => ({
  ...task,
  createdAt: serializeDate(task.createdAt) || '',
  updatedAt: serializeDate(task.updatedAt) || '',
  completedAt: serializeDate(task.completedAt),
  resources: task.resources.map(serializeEnhancedResource),
  reviewSchedule: serializeReviewSchedule(task.reviewSchedule),
  timeTracking: serializeTaskTimeTracking(task.timeTracking),
});

export const deserializeTaskDates = (task: SerializedTask): Task => ({
  ...task,
  createdAt: deserializeDate(task.createdAt) || new Date(),
  updatedAt: deserializeDate(task.updatedAt) || new Date(),
  completedAt: deserializeDate(task.completedAt),
  resources: task.resources.map(deserializeEnhancedResource),
  reviewSchedule: deserializeReviewSchedule(task.reviewSchedule),
  timeTracking: deserializeTaskTimeTracking(task.timeTracking),
}); 