import { FormEvent, useEffect, useState } from 'react';
import { type User } from 'firebase/auth';
import { CheckCircle2, Loader2, LogOut, Star, X } from 'lucide-react';
import {
  signInWithGoogleForReview,
  signOutReviewer,
  subscribeToAuth,
} from '../lib/firebase';
import { REVIEW_CONSTRAINTS, submitGuestReview } from '../services/reviews';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [quote, setQuote] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((nextUser) => {
      setUser(nextUser);
      if (nextUser?.displayName && !name.trim()) {
        setName(nextUser.displayName.slice(0, REVIEW_CONSTRAINTS.NAME_MAX));
      }
    });
    return unsubscribe;
  }, [name]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const activeStars = hoveredRating ?? rating;

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsSigningIn(true);
    try {
      const signedInUser = await signInWithGoogleForReview();
      if (signedInUser.displayName && !name.trim()) {
        setName(signedInUser.displayName.slice(0, REVIEW_CONSTRAINTS.NAME_MAX));
      }
    } catch (err) {
      const message =
        err instanceof Error && err.message.includes('popup-closed-by-user')
          ? 'Sign-in was cancelled. Please try again to verify and post your review.'
          : 'Could not complete Google sign-in right now. Please allow popups and try again.';
      setErrorMsg(message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedQuote = quote.trim();

    if (trimmedName.length < REVIEW_CONSTRAINTS.NAME_MIN) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }
    if (trimmedQuote.length < REVIEW_CONSTRAINTS.QUOTE_MIN) {
      setErrorMsg('Please share a few more words about your visit (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);
    try {
      if (!user || !user.emailVerified) {
        await signInWithGoogleForReview();
      }
      await submitGuestReview({
        name: trimmedName,
        subtitle: subtitle.trim() || 'Verified Diner · Ilford',
        stars: rating,
        quote: trimmedQuote,
      });
      setSubmitted(true);
      setQuote('');
    } catch (err) {
      if (err instanceof Error && err.message.includes('popup-closed-by-user')) {
        setErrorMsg('Google sign-in is required to verify and publish your review.');
      } else if (err instanceof Error && err.message.startsWith('{')) {
        setErrorMsg('Could not save your review due to a permission check. Please try signing in again.');
      } else {
        setErrorMsg(
          err instanceof Error ? err.message : 'Unable to submit your review right now. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          handleResetAndClose();
        }
      }}
      className="fixed inset-0 z-50 bg-[#141217]/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg bg-[#211D25] rounded-xl shadow-2xl border border-[#D4AF37]/45 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#18151B] text-[#F7F1E3] border-b border-[#D4AF37]/30">
          <div>
            <h2 id="write-review-title" className="font-serif text-xl sm:text-2xl font-semibold text-[#ECC55F]">
              Write a Guest Review
            </h2>
            <p className="text-xs text-[#D8CFC4] mt-0.5">
              Share your experience dining at 290 Ilford Lane
            </p>
          </div>
          <button
            type="button"
            aria-label="Close review modal"
            disabled={isSubmitting}
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#F7F1E3] transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="p-7 text-center">
            <div className="w-12 h-12 rounded-full bg-[#166534]/25 text-[#4ADE80] border border-[#4ADE80]/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#F7F1E3] mb-2">
              Thank You for Your Review
            </h3>
            <p className="text-sm text-[#D8CFC4] leading-relaxed mb-6">
              Your reflection has been saved and is now visible in Guest Reflections below.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-6 py-2.5 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-xs font-bold uppercase tracking-wider rounded-lg transition-all hover:brightness-110 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Star Rating Selector */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#F7F1E3] mb-2">
                Your Rating
              </span>
              <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const filled = starValue <= activeStars;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      role="radio"
                      aria-checked={rating === starValue}
                      aria-label={`${starValue} ${starValue === 1 ? 'star' : 'stars'}`}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(null)}
                      onClick={() => setRating(starValue)}
                      className="p-1 rounded-md hover:scale-110 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          filled ? 'text-[#F0C75E] fill-[#F0C75E]' : 'text-[#D4AF37]/35'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-xs font-semibold text-[#D8CFC4] tabular-nums">
                  {rating} / 5
                </span>
              </div>
            </div>

            {/* Name & Visit Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="review-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[#F7F1E3] mb-1.5"
                >
                  Your Name *
                </label>
                <input
                  id="review-name"
                  type="text"
                  required
                  maxLength={REVIEW_CONSTRAINTS.NAME_MAX}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha K."
                  className="w-full bg-[#18151B] border border-[#D4AF37]/30 text-[#F7F1E3] placeholder:text-[#B4A89B] text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0C75E]/35 focus:border-[#F0C75E]"
                />
              </div>

              <div>
                <label
                  htmlFor="review-subtitle"
                  className="block text-xs font-bold uppercase tracking-wider text-[#F7F1E3] mb-1.5"
                >
                  Neighborhood or Visit
                </label>
                <input
                  id="review-subtitle"
                  type="text"
                  maxLength={REVIEW_CONSTRAINTS.SUBTITLE_MAX}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Dined In · Ilford"
                  className="w-full bg-[#18151B] border border-[#D4AF37]/30 text-[#F7F1E3] placeholder:text-[#B4A89B] text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0C75E]/35 focus:border-[#F0C75E]"
                />
              </div>
            </div>

            {/* Review Quote */}
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label
                  htmlFor="review-quote"
                  className="block text-xs font-bold uppercase tracking-wider text-[#F7F1E3]"
                >
                  Your Review *
                </label>
                <span className="text-[11px] text-[#B4A89B] tabular-nums">
                  {quote.length}/{REVIEW_CONSTRAINTS.QUOTE_MAX}
                </span>
              </div>
              <textarea
                id="review-quote"
                rows={4}
                required
                maxLength={REVIEW_CONSTRAINTS.QUOTE_MAX}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Tell future guests what you ordered and how your meal was..."
                className="w-full bg-[#18151B] border border-[#D4AF37]/30 text-[#F7F1E3] placeholder:text-[#B4A89B] text-sm p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0C75E]/35 focus:border-[#F0C75E] resize-y"
              />
            </div>

            {/* Verified Reviewer Bar */}
            <div className="rounded-lg bg-[#27222C] border border-[#D4AF37]/30 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              {user && user.emailVerified ? (
                <>
                  <span className="text-[#F7F1E3] font-medium truncate">
                    Posting as <strong className="font-semibold text-[#ECC55F]">{user.email}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => void signOutReviewer()}
                    className="inline-flex items-center gap-1 text-[#ECC55F] hover:text-[#F7F1E3] font-semibold cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Switch Account</span>
                  </button>
                </>
              ) : (
                <>
                  <span className="text-[#D8CFC4]">
                    Quick Google verification ensures genuine diner reviews.
                  </span>
                  <button
                    type="button"
                    disabled={isSigningIn}
                    onClick={handleGoogleSignIn}
                    className="px-3 py-1.5 rounded-md bg-[#18151B] border border-[#D4AF37]/50 text-[#ECC55F] font-semibold hover:bg-[#322B39] transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
                  >
                    {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
                  </button>
                </>
              )}
            </div>

            {errorMsg && (
              <p
                role="alert"
                className="text-xs font-medium text-[#FCA5A5] bg-[#7F1D1D]/25 border border-[#FCA5A5]/35 rounded-lg px-3 py-2"
              >
                {errorMsg}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleResetAndClose}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#D8CFC4] hover:text-[#F7F1E3] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isSigningIn}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm hover:brightness-110 transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                <span>
                  {isSubmitting
                    ? 'Publishing...'
                    : user && user.emailVerified
                    ? 'Publish Review'
                    : 'Verify & Publish'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
