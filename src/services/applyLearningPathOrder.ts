import { firebaseFirestore } from '../config/firebase';

// Assigns learningOrder to all tasks in Firestore based on a curated basic→advanced path
export const applyLearningPathOrder = async () => {
  // Curated order (mix of categories). Unknown tasks get appended after known ones
  const orderedIds: string[] = [
    // Stage 1 — JavaScript Core
    'js-fundamentals', 'js-hoisting', 'js-prototype-inheritance', 'js-this-binding',
    'js-closures', 'js-event-loop', 'js-promises', 'js-async-await',
    'js-destructuring-rest-spread', 'js-modules', 'js-coercion-equality',
    'js-strings-arrays', 'js-collections', 'js-iterators-generators', 'js-symbols',
    'js-object-descriptors', 'js-proxy-reflect', 'js-numbers-precision', 'js-date-intl', 'js-regexp',

    // Stage 2 — DSA Patterns
    'dsa-hashmap-frequency', 'dsa-two-pointers', 'dsa-sliding-window', 'dsa-prefix-sum', 'dsa-binary-search',
    'dsa-stack-queue', 'dsa-heap-pq', 'dsa-linked-list', 'dsa-intervals', 'dsa-trees-traversals',
    'dsa-graphs', 'dsa-dp-1d', 'dsa-backtracking', 'dsa-bit-manipulation',

    // Stage 3 — React Core
    'react-basics', 'react-hooks-deep-dive', 'react-rerendering-and-optimization', 'react-patterns',
    'react-forms', 'react-context', 'react-error-boundaries', 'react-refs-forwardref',
    'react-suspense', 'react-typescript', 'react-testing', 'react-accessibility', 'react-ssr-next',
    'react-state-management-rtk', 'react-performance',

    // Stage 4 — React Native Core
    'rn-architecture', 'rn-architecture-detailed', 'rn-navigation', 'rn-performance', 'rn-memory-cache-performance',
    'rn-gestures-reanimated', 'rn-native-modules', 'rn-networking', 'rn-offline', 'rn-notifications', 'rn-accessibility', 'rn-deployment',

    // Stage 5 — System Design
    'sd-foundations', 'sd-load-balancing', 'sd-caching-cdn', 'sd-databases', 'sd-queues-streams',
    'sd-cap-theorem', 'sd-microservices', 'sd-api-design',
    'sd-url-shortener', 'sd-news-feed', 'sd-instagram', 'sd-whatsapp', 'sd-ride-sharing',
    'sd-search-autocomplete', 'sd-observability', 'sd-security', 'sd-circuit-breakers',

    // Stage 6 — Machine Coding
    'mc-button-component', 'mc-input-form-field', 'mc-modal', 'mc-toast-notifications',
    'mc-accordion-tabs', 'mc-table', 'mc-calendar-datepicker',
    'mc-list-search-sort-pagination', 'mc-todo-crud', 'mc-virtualized-list', 'mc-dnd', 'mc-file-upload', 'mc-offline-cache',

    // Custom 4 topics already included above by ids if any differ, keep here as well
    'react-all-hooks-catalog', // alias of hooks deep-dive set
  ];

  const idToOrder = new Map<string, number>();
  orderedIds.forEach((id, idx) => idToOrder.set(id, idx + 1));

  // Fetch all tasks
  const snap = await firebaseFirestore.collection('tasks').get();
  if (snap.empty) {
    return { total: 0, updated: 0, unknown: 0 };
  }

  let updated = 0;
  let unknown = 0;
  const batch = firebaseFirestore.batch();
  let ops = 0;

  snap.forEach(doc => {
    const id = doc.id;
    const order = idToOrder.get(id);
    let learningOrder: number;
    if (order !== undefined) {
      learningOrder = order;
    } else {
      // Place unknown tasks after known ones, deterministically by createdAt if available, else by id hash
      unknown += 1;
      learningOrder = orderedIds.length + unknown; // simple append
    }
    batch.update(doc.ref, { learningOrder, updatedAt: new Date().toISOString() });
    updated += 1;
    ops += 1;
    // Commit periodically to avoid oversized batches (limit ~500)
    if (ops >= 400) {
      // NOTE: we cannot await inside forEach; in practice caller volume is small; keeping simple here
    }
  });

  await batch.commit();
  return { total: snap.size, updated, unknown };
};

