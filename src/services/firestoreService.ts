import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  setDoc,
  doc,
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  increment,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  serviceInterest?: string;
  budget?: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  createdAt?: Timestamp | Date | any;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribedAt: Timestamp | Date | any;
  source?: string;
}

export interface ClientInquiry {
  id?: string;
  clientName: string;
  email: string;
  projectType: string;
  details: string;
  submittedAt: Timestamp | Date | any;
}

export interface ViewCountRecord {
  itemId: string;
  itemType: 'project' | 'article';
  views: number;
  lastViewedAt?: any;
  updatedAt?: any;
}

export interface PopularityMetric {
  tier: 'viral' | 'high' | 'trending' | 'active' | 'new';
  label: string;
  rankText?: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  badgeVariant: 'amber' | 'cyan' | 'purple' | 'emerald' | 'default';
  percentile: number;
}

/**
 * Submit a contact form inquiry into Firestore
 */
export async function submitContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>): Promise<string> {
  const path = 'contact_inquiries';
  try {
    const inquiriesRef = collection(db, path);
    const docRef = await addDoc(inquiriesRef, {
      ...inquiry,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Subscribe email to newsletter in Firestore
 */
export async function subscribeNewsletter(email: string, source: string = 'website_footer'): Promise<string> {
  const path = 'newsletter_subscribers';
  try {
    const subscribersRef = collection(db, path);
    const docRef = await addDoc(subscribersRef, {
      email,
      source,
      subscribedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Fetch recent contact inquiries (for dashboard / telemetry viewing)
 */
export async function getRecentInquiries(maxCount: number = 20): Promise<ContactInquiry[]> {
  const path = 'contact_inquiries';
  try {
    const inquiriesRef = collection(db, path);
    const q = query(inquiriesRef, orderBy('createdAt', 'desc'), limit(maxCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as ContactInquiry[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Format document ID for view telemetry
 */
export function getViewDocId(itemId: string, itemType: 'project' | 'article'): string {
  // Normalize ID: alphanumeric, hyphen, underscore
  const safeId = itemId.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${itemType}_${safeId}`;
}

/**
 * Increment and record a view in Firestore for projects or articles.
 * Includes session deduplication to prevent spamming on rapid re-renders.
 */
export async function incrementItemView(
  itemId: string,
  itemType: 'project' | 'article',
  force: boolean = false
): Promise<void> {
  const docId = getViewDocId(itemId, itemType);
  const path = `view_counts/${docId}`;
  const sessionKey = `viewed_${docId}`;

  // Check if already viewed in this browser session unless forced
  if (!force && typeof window !== 'undefined' && window.sessionStorage) {
    const alreadyViewed = window.sessionStorage.getItem(sessionKey);
    if (alreadyViewed) {
      return;
    }
  }

  try {
    const docRef = doc(db, 'view_counts', docId);
    await setDoc(
      docRef,
      {
        itemId,
        itemType,
        views: increment(1),
        lastViewedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(sessionKey, Date.now().toString());
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Subscribe to real-time view count changes for a specific item
 */
export function subscribeToItemViews(
  itemId: string,
  itemType: 'project' | 'article',
  onUpdate: (data: { views: number; lastViewedAt?: any }) => void,
  onError?: (err: any) => void
): () => void {
  const docId = getViewDocId(itemId, itemType);
  const path = `view_counts/${docId}`;
  const docRef = doc(db, 'view_counts', docId);

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        onUpdate({
          views: typeof data.views === 'number' ? data.views : 0,
          lastViewedAt: data.lastViewedAt,
        });
      } else {
        onUpdate({ views: 0 });
      }
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Fetch view count for a specific item once
 */
export async function getItemViews(itemId: string, itemType: 'project' | 'article'): Promise<number> {
  const docId = getViewDocId(itemId, itemType);
  const path = `view_counts/${docId}`;
  try {
    const docRef = doc(db, 'view_counts', docId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return typeof data.views === 'number' ? data.views : 0;
    }
    return 0;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Fetch all view records for ranking and relative popularity calculation
 */
export async function fetchAllItemViews(): Promise<Record<string, number>> {
  const path = 'view_counts';
  try {
    const viewRef = collection(db, path);
    const snapshot = await getDocs(viewRef);
    const result: Record<string, number> = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const views = typeof data.views === 'number' ? data.views : 0;
      if (data.itemId) {
        result[`${data.itemType}_${data.itemId}`] = views;
        result[data.itemId] = views;
      }
    });
    return result;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Computes dynamic popularity metrics based on relative view volume
 */
export function calculatePopularityMetric(views: number, allViewsList: number[] = []): PopularityMetric {
  if (views <= 0) {
    return {
      tier: 'new',
      label: 'New Release',
      colorClass: 'text-slate-500 dark:text-slate-400',
      bgClass: 'bg-slate-100 dark:bg-slate-800/80',
      borderClass: 'border-slate-200 dark:border-slate-700',
      badgeVariant: 'default',
      percentile: 0,
    };
  }

  // Filter and sort views list
  const validViews = allViewsList.filter((v) => v > 0).sort((a, b) => b - a);
  const maxViews = validViews.length > 0 ? validViews[0] : views;
  const rank = validViews.indexOf(views) + 1;

  if (views >= 100 || (rank === 1 && views >= 10)) {
    return {
      tier: 'viral',
      label: '🔥 High Interest',
      rankText: rank === 1 ? '#1 Most Viewed' : 'Top Tier',
      colorClass: 'text-amber-600 dark:text-amber-400',
      bgClass: 'bg-amber-500/10 dark:bg-amber-500/15',
      borderClass: 'border-amber-500/30',
      badgeVariant: 'amber',
      percentile: 98,
    };
  }

  if (views >= 25 || (rank > 0 && rank <= 3 && views >= 5)) {
    return {
      tier: 'trending',
      label: '⚡ Trending',
      rankText: rank <= 3 && rank > 0 ? `Top #${rank}` : 'Trending',
      colorClass: 'text-cyan-600 dark:text-cyan-400',
      bgClass: 'bg-cyan-500/10 dark:bg-cyan-500/15',
      borderClass: 'border-cyan-500/30',
      badgeVariant: 'cyan',
      percentile: 85,
    };
  }

  if (views >= 5) {
    return {
      tier: 'active',
      label: '✨ Highly Explored',
      colorClass: 'text-indigo-600 dark:text-indigo-400',
      bgClass: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      borderClass: 'border-indigo-500/30',
      badgeVariant: 'purple',
      percentile: 65,
    };
  }

  return {
    tier: 'active',
    label: '👀 Active Readers',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    borderClass: 'border-emerald-500/30',
    badgeVariant: 'emerald',
    percentile: 40,
  };
}
