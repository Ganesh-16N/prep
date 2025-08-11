import { firebaseFirestore } from '../config/firebase';

export type CategoryName = 'JavaScript' | 'React' | 'React Native' | 'System Design' | 'DSA' | 'Machine Coding';

type CategorySummary = {
  category: CategoryName;
  before: number;
  after: number;
  uploaded: number;
  errors: number;
};

const getCategoryCount = async (category: CategoryName): Promise<number> => {
  const snap = await firebaseFirestore.collection('tasks').where('category', '==', category).get();
  return snap.size;
};

export const auditAndUploadAllCategories = async () => {
  const summaries: CategorySummary[] = [];

  const categories: { name: CategoryName; uploader: () => Promise<{ successCount: number; errorCount: number }>; }[] = [
    { name: 'JavaScript', uploader: async () => (await import('./uploadAllJavaScriptTasks')).uploadAllJavaScriptTasks() },
    { name: 'React', uploader: async () => (await import('./uploadAllReactTasks')).uploadAllReactTasks() },
    { name: 'React Native', uploader: async () => (await import('./uploadAllReactNativeTasks')).uploadAllReactNativeTasks() },
    { name: 'System Design', uploader: async () => (await import('./uploadAllSystemDesignTasks')).uploadAllSystemDesignTasks() },
    { name: 'DSA', uploader: async () => (await import('./uploadAllDSATasks')).uploadAllDSATasks() },
    { name: 'Machine Coding', uploader: async () => (await import('./uploadAllMachineCodingTasks')).uploadAllMachineCodingTasks() },
  ];

  for (const { name, uploader } of categories) {
    const before = await getCategoryCount(name);
    let success = 0;
    let errors = 0;
    try {
      const result = await uploader();
      success = result.successCount;
      errors = result.errorCount;
    } catch (e) {
      errors += 1;
    }
    const after = await getCategoryCount(name);
    summaries.push({ category: name, before, after, uploaded: success, errors });
  }

  return summaries;
};

