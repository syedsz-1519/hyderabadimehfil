import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

export const REVIEW_CONSTRAINTS = {
  NAME_MIN: 2,
  NAME_MAX: 60,
  SUBTITLE_MIN: 2,
  SUBTITLE_MAX: 60,
  QUOTE_MIN: 10,
  QUOTE_MAX: 500,
  STARS_MIN: 1,
  STARS_MAX: 5,
} as const;

export interface GuestReview {
  id: string;
  authorUid?: string;
  name: string;
  initial: string;
  subtitle: string;
  stars: number;
  quote: string;
  createdAtMs?: number;
  isLive?: boolean;
}

interface FirestoreReviewDoc {
  authorUid: string;
  name: string;
  subtitle: string;
  stars: number;
  quote: string;
  createdAt?: Timestamp | null;
}

const REVIEWS_COLLECTION = 'reviews';

function computeInitial(name: string): string {
  const cleaned = name.trim();
  return cleaned ? cleaned.charAt(0).toUpperCase() : 'G';
}

export function subscribeToReviews(
  onUpdate: (reviews: GuestReview[]) => void,
  onError?: (message: string) => void
): () => void {
  const reviewsRef = collection(db, REVIEWS_COLLECTION);
  const reviewsQuery = query(reviewsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    reviewsQuery,
    (snapshot) => {
      const items: GuestReview[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as FirestoreReviewDoc;
        const safeName = (data.name || 'Guest').trim();
        const safeSubtitle = (data.subtitle || 'Verified Diner · Ilford').trim();
        const safeStars = Math.min(
          REVIEW_CONSTRAINTS.STARS_MAX,
          Math.max(REVIEW_CONSTRAINTS.STARS_MIN, Math.round(Number(data.stars) || 5))
        );
        return {
          id: docSnap.id,
          authorUid: data.authorUid,
          name: safeName,
          initial: computeInitial(safeName),
          subtitle: safeSubtitle,
          stars: safeStars,
          quote: (data.quote || '').trim(),
          createdAtMs: data.createdAt?.toMillis?.() ?? Date.now(),
          isLive: true,
        };
      });
      onUpdate(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, REVIEWS_COLLECTION);
      } catch (wrappedError) {
        onError?.(
          wrappedError instanceof Error
            ? wrappedError.message
            : 'Unable to load guest reviews right now.'
        );
      }
    }
  );
}

export interface SubmitReviewInput {
  name: string;
  subtitle?: string;
  stars: number;
  quote: string;
}

export async function submitGuestReview(input: SubmitReviewInput): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser || !currentUser.emailVerified) {
    throw new Error('Please sign in with Google before posting your review.');
  }

  const trimmedName = input.name.trim().slice(0, REVIEW_CONSTRAINTS.NAME_MAX);
  const rawSubtitle = (input.subtitle || '').trim();
  const safeSubtitle = (rawSubtitle || 'Verified Diner · Ilford').slice(
    0,
    REVIEW_CONSTRAINTS.SUBTITLE_MAX
  );
  const safeQuote = input.quote.trim().slice(0, REVIEW_CONSTRAINTS.QUOTE_MAX);
  const safeStars = Math.min(
    REVIEW_CONSTRAINTS.STARS_MAX,
    Math.max(REVIEW_CONSTRAINTS.STARS_MIN, Math.round(input.stars))
  );

  if (trimmedName.length < REVIEW_CONSTRAINTS.NAME_MIN) {
    throw new Error('Please enter your name (at least 2 characters).');
  }
  if (safeSubtitle.length < REVIEW_CONSTRAINTS.SUBTITLE_MIN) {
    throw new Error('Location or visit label must be at least 2 characters.');
  }
  if (safeQuote.length < REVIEW_CONSTRAINTS.QUOTE_MIN) {
    throw new Error('Please write at least 10 characters in your review.');
  }

  try {
    await addDoc(collection(db, REVIEWS_COLLECTION), {
      authorUid: currentUser.uid,
      name: trimmedName,
      subtitle: safeSubtitle,
      stars: safeStars,
      quote: safeQuote,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, REVIEWS_COLLECTION);
  }
}
