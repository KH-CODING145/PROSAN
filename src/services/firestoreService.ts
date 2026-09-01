import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

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

/**
 * Submit a contact form inquiry into Firestore
 */
export async function submitContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>): Promise<string> {
  try {
    const inquiriesRef = collection(db, 'contact_inquiries');
    const docRef = await addDoc(inquiriesRef, {
      ...inquiry,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting contact inquiry to Firestore:', error);
    throw error;
  }
}

/**
 * Subscribe email to newsletter in Firestore
 */
export async function subscribeNewsletter(email: string, source: string = 'website_footer'): Promise<string> {
  try {
    const subscribersRef = collection(db, 'newsletter_subscribers');
    const docRef = await addDoc(subscribersRef, {
      email,
      source,
      subscribedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error subscribing to newsletter in Firestore:', error);
    throw error;
  }
}

/**
 * Fetch recent contact inquiries (for dashboard / telemetry viewing)
 */
export async function getRecentInquiries(maxCount: number = 20): Promise<ContactInquiry[]> {
  try {
    const inquiriesRef = collection(db, 'contact_inquiries');
    const q = query(inquiriesRef, orderBy('createdAt', 'desc'), limit(maxCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as ContactInquiry[];
  } catch (error) {
    console.error('Error fetching inquiries from Firestore:', error);
    return [];
  }
}
