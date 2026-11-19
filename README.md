# Hyderabadi Mehfil

**Authentic Hyderabadi Dum Biryani, Halal Mandi & Tandoor Cuisine in Ilford, London**

![React](https://img.shields.io/badge/react-19.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-7.0-blue)
![Vite](https://img.shields.io/badge/vite-8.3-purple)
![Firebase](https://img.shields.io/badge/firebase-13.4-orange)
![License](https://img.shields.io/badge/license-proprietary-red)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm 11.x or later
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/hyderabadimehfil.git
   cd hyderabadimehfil
   ```

2. **Install dependencies:**
   ```bash
   npm ci  # Use ci instead of install for reproducible builds
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
hyderabadimehfil/
├── src/
│   ├── App.tsx                    # Main app component & routing
│   ├── main.tsx                   # Entry point with monitoring setup
│   ├── index.css                  # Global styles
│   │
│   ├── components/                # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ReviewModal.tsx
│   │   ├── ErrorBoundary.tsx      # Error boundary with Sentry integration
│   │   ├── SEO.tsx                # Dynamic meta tag management
│   │   └── ...
│   │
│   ├── pages/                     # Page-level components
│   │   ├── HomePage.tsx
│   │   ├── MenuPage.tsx
│   │   └── ContactPage.tsx
│   │
│   ├── lib/                       # Core utilities & services
│   │   ├── firebase.ts            # Firebase initialization with env vars
│   │   ├── firebaseErrorHandler.ts # Centralized error handling
│   │   ├── monitoring.ts          # Sentry & performance monitoring
│   │   └── logger.ts              # Structured logging
│   │
│   ├── config/
│   │   └── env.ts                 # Environment variable validation with Zod
│   │
│   ├── services/
│   │   └── reviews.ts             # Firestore review operations
│   │
│   ├── schemas/                   # Zod validation schemas
│   │   ├── review.schema.ts
│   │   └── contact.schema.ts
│   │
│   ├── utils/
│   │   ├── rateLimit.ts           # Rate limiting & throttling utilities
│   │   └── ...
│   │
│   ├── data/
│   │   ├── restaurantData.ts      # Menu, constants, type definitions
│   │   └── ...
│   │
│   ├── assets/                    # Images and media
│   │   └── images/
│   │
│   └── __tests__/                 # Test files
│       ├── setup.ts               # Test configuration
│       ├── config/
│       ├── utils/
│       └── schemas/
│
├── public/
│   └── assets/                    # Public static assets
│
├── docs/
│   ├── OPERATIONS.md              # Production operations guide
│   └── ...
│
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD pipeline
│
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── .eslintrc.js                   # ESLint configuration
├── vite.config.ts                 # Vite build configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
├── firestore.rules                # Firestore security rules
└── index.html                     # HTML entry point with meta tags
```

---

## 🛠️ Available Scripts

### Development

```bash
npm run dev          # Start development server on port 3000
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run clean        # Delete dist and build artifacts
```

### Quality Assurance

```bash
npm run lint         # Run TypeScript type checking
npm run test         # Run unit tests with Vitest
npm run test:ui      # Run tests with UI dashboard
npm run test:coverage # Generate coverage report
```

---

## 🔐 Environment Configuration

### Required Environment Variables

```bash
# Firebase Configuration (from Firebase Console)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXX...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_FIRESTORE_DB_ID=your-db-id
VITE_FIREBASE_OAUTH_CLIENT_ID=123456789.apps.googleusercontent.com

# Error Tracking (optional)
VITE_SENTRY_DSN=https://key@sentry.io/project-id
VITE_SENTRY_ENVIRONMENT=development
```

### Validating Environment

Environment variables are validated at app startup using Zod. Missing or invalid variables will throw descriptive errors.

```typescript
import { env } from '@/config/env';

// Access validated config
console.log(env.firebaseProjectId);
console.log(env.isDevelopment);
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm test -- --watch

# Run specific test file
npm test -- src/__tests__/schemas/review.schema.test.ts

# Generate coverage report
npm test:coverage
```

### Test Organization

- **Unit Tests:** `src/__tests__/`
  - Environment validation: `config/env.test.ts`
  - Utilities: `utils/rateLimit.test.ts`
  - Schemas: `schemas/review.schema.test.ts`

### Writing Tests

Example test:

```typescript
import { describe, it, expect } from 'vitest';
import { submitReviewSchema } from '@/schemas/review.schema';

describe('Review Validation', () => {
  it('should validate correct review input', () => {
    const input = { name: 'John', stars: 5, quote: 'Excellent!' };
    const result = submitReviewSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});
```

---

## 🔍 Input Validation

All user inputs are validated using Zod schemas before processing:

### Review Submission

```typescript
import { submitReviewSchema } from '@/schemas/review.schema';

const result = submitReviewSchema.safeParse(formData);
if (!result.success) {
  // Handle validation error
  console.error(result.error.errors);
} else {
  // Process valid data
  await submitGuestReview(result.data);
}
```

### Contact Form

```typescript
import { contactFormSchema } from '@/schemas/contact.schema';

const validated = contactFormSchema.parse(formData);
```

---

## 🛡️ Error Handling

### Firebase Error Handling

All Firebase operations use centralized error handling:

```typescript
import { handleFirebaseError } from '@/lib/firebaseErrorHandler';

try {
  await submitGuestReview(reviewData);
} catch (error) {
  const userMessage = handleFirebaseError(error, {
    operationType: OperationType.CREATE,
    collectionPath: 'reviews',
  });
  // Display userMessage to user
}
```

### Global Error Boundary

Unhandled React errors are caught by `<ErrorBoundary>`:

```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Rate Limiting

Prevent abuse with built-in rate limiting:

```typescript
import { checkRateLimit } from '@/utils/rateLimit';

const { isAllowed, remaining } = checkRateLimit('reviewSubmit');
if (!isAllowed) {
  throw new Error('Too many requests. Please wait before trying again.');
}
```

---

## 📊 Monitoring & Observability

### Error Tracking with Sentry

Automatically captures:
- Unhandled exceptions
- Promise rejections
- Firebase errors
- Network failures

Access dashboard: [Sentry.io](https://sentry.io)

### Performance Monitoring

Firebase tracks:
- Page load time
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

Access dashboard: [Firebase Console](https://console.firebase.google.com) > Performance

### Logging

```typescript
import { log } from '@/lib/logger';

log.debug('Debug message', { context: 'data' });
log.info('User action', { userId: user.id });
log.warn('Performance issue', { duration: 5000 });
log.error('Operation failed', error);
```

---

## 🌐 SEO & Meta Tags

### Dynamic Meta Tag Management

Use the `<SEO>` component to manage per-page meta tags:

```typescript
import { SEO, seoPresets } from '@/components/SEO';

export function MenuPage() {
  return (
    <>
      <SEO {...seoPresets.menu} />
      {/* Page content */}
    </>
  );
}
```

### Canonical URLs

Canonical URLs are automatically set to prevent duplicate content issues.

### Open Graph & Twitter Cards

All social media preview tags are managed by the `<SEO>` component.

---

## 🚀 Deployment

### Automatic Deployment (CI/CD)

1. **Push to GitHub:**
   ```bash
   git push origin main  # Deploy to production
   git push origin staging  # Deploy to staging
   ```

2. **GitHub Actions automatically:**
   - Lints code
   - Runs tests
   - Builds application
   - Deploys to Vercel

### Manual Deployment

```bash
npm run build
npm install -g vercel
vercel deploy --prod
```

### Deployment Checklist

- [ ] Tests passing (`npm test`)
- [ ] Type checking passing (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] Environment variables set in GitHub Secrets
- [ ] Firebase security rules deployed
- [ ] Sentry project configured (if using error tracking)

---

## 🔐 Security

### Firestore Security Rules

All database access is controlled by security rules in `firestore.rules`:

- ✅ Email-verified authentication required
- ✅ Owner-only mutations
- ✅ Data validation on write
- ✅ Public read access for reviews list

To update:

```bash
firebase deploy --only firestore:rules
```

### Environment Variable Protection

- Never commit `.env` files (use `.env.local` and `.gitignore`)
- Use GitHub Secrets for CI/CD credentials
- Rotate API keys quarterly

### CORS & Headers

Production security headers configured in deployment:

- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy`

---

## 📚 Documentation

- **[OPERATIONS.md](./docs/OPERATIONS.md)** - Production operations guide
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[SECURITY.md](./SECURITY.md)** - Security policy
- **Firebase Docs:** [firebase.google.com](https://firebase.google.com/docs)
- **React Docs:** [react.dev](https://react.dev)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:
- Code style
- Commit conventions
- Pull request process
- Testing requirements

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is prohibited.

---

## 👥 Team

- **Project Lead:** Syed (syed.sz.2126@gmail.com)
- **Infrastructure:** Firebase + Vercel
- **Monitoring:** Sentry

---

## 🆘 Support

For issues and questions:

1. Check existing [GitHub Issues](https://github.com/yourusername/hyderabadimehfil/issues)
2. Review [OPERATIONS.md](./docs/OPERATIONS.md) troubleshooting section
3. Contact project lead

---

**Live Site:** [www.hyderabadimehfil.co.uk](https://www.hyderabadimehfil.co.uk)  
**Staging:** [staging.hyderabadimehfil.co.uk](https://staging.hyderabadimehfil.co.uk)  
**Restaurant:** 290 Ilford Lane, Ilford, IG1 2LP
