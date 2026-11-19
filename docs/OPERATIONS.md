# Operations & Deployment Guide

**Hyderabadi Mehfil** - Production Operations Documentation

---

## Table of Contents

1. [CI/CD Pipeline](#cicd-pipeline)
2. [Deployment Process](#deployment-process)
3. [Environment Configuration](#environment-configuration)
4. [Monitoring & Observability](#monitoring--observability)
5. [Firestore Backups](#firestore-backups)
6. [Data Retention & TTL](#data-retention--ttl)
7. [Security & Access Control](#security--access-control)
8. [Incident Response](#incident-response)
9. [Troubleshooting](#troubleshooting)

---

## CI/CD Pipeline

### Overview

The application uses **GitHub Actions** for continuous integration and continuous deployment. All changes are automatically tested, built, and deployed on push to `main` (production) or `staging` branches.

### Pipeline Stages

1. **Lint & Test** (runs on all PRs and pushes)
   - TypeScript compilation check (`npm run lint`)
   - Unit tests (`npm run test`)
   - Code coverage report (`npm run test:coverage`)
   - Application build (`npm run build`)

2. **Security Audit** (runs on all PRs and pushes)
   - npm audit for dependency vulnerabilities
   - OWASP Dependency Check for security issues

3. **Deploy to Staging** (automatic on push to `staging` branch)
   - Deploys to staging Vercel environment
   - For pre-production testing

4. **Deploy to Production** (automatic on push to `main` branch)
   - Requires all checks to pass
   - Deployed to production Vercel environment
   - Sends Slack notification on success/failure

### GitHub Secrets Required

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

```
VITE_FIREBASE_API_KEY              # Firebase API Key
VITE_FIREBASE_AUTH_DOMAIN          # Firebase Auth Domain
VITE_FIREBASE_PROJECT_ID           # Firebase Project ID
VITE_FIREBASE_STORAGE_BUCKET       # Firebase Storage Bucket
VITE_FIREBASE_MESSAGING_SENDER_ID  # Firebase Messaging Sender ID
VITE_FIREBASE_APP_ID               # Firebase App ID
VITE_FIREBASE_FIRESTORE_DB_ID      # Firestore Database ID
VITE_FIREBASE_OAUTH_CLIENT_ID      # OAuth Client ID
VITE_SENTRY_DSN                    # Sentry error tracking DSN (optional)
VERCEL_TOKEN                       # Vercel authentication token
VERCEL_ORG_ID                      # Vercel organization ID
VERCEL_PROJECT_ID                  # Vercel production project ID
VERCEL_PROJECT_ID_STAGING          # Vercel staging project ID
SLACK_WEBHOOK                      # Slack webhook for notifications (optional)
```

---

## Deployment Process

### Manual Deployment

To manually deploy without going through CI/CD:

1. **Build locally:**
   ```bash
   npm ci
   npm run build
   ```

2. **Verify build output:**
   ```bash
   ls -la dist/
   ```

3. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel deploy --prod
   ```

### Rollback Procedure

If production deployment fails:

1. **Check Vercel deployments:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Select Hyderabadi Mehfil project
   - Find the previous successful deployment
   - Click "Promote to Production"

2. **Or revert git and redeploy:**
   ```bash
   git revert HEAD                  # Revert last commit
   git push origin main              # Triggers auto-deployment
   ```

3. **Verify rollback:**
   - Check [Vercel Deployments](https://vercel.com)
   - Verify production URL is serving correct version
   - Monitor Sentry for any errors

---

## Environment Configuration

### Local Development Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in Firebase credentials:**
   Get values from [Firebase Console](https://console.firebase.google.com):
   - Project ID
   - API Key
   - Auth Domain
   - Firestore Database ID
   - OAuth Client ID

   ```bash
   # .env.local
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXX...
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_FIRESTORE_DB_ID=your-db-id
   VITE_FIREBASE_OAUTH_CLIENT_ID=12345-xxxxx.apps.googleusercontent.com
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Production Environment

Production environment is configured in GitHub Secrets. Each secret is automatically injected during build:

```bash
npm run build  # Uses env vars from GitHub Secrets
```

### Staging vs Production

Environment detection is automatic based on `VITE_SENTRY_ENVIRONMENT`:

- **Staging:** `VITE_SENTRY_ENVIRONMENT=staging`
  - 100% error tracking sample rate
  - Debug logging enabled
  - URL: `staging.hyderabadimehfil.co.uk`

- **Production:** `VITE_SENTRY_ENVIRONMENT=production`
  - 10% error tracking sample rate (to reduce noise)
  - Info/Warn/Error logging only
  - URL: `www.hyderabadimehfil.co.uk`

---

## Monitoring & Observability

### Error Tracking (Sentry)

All unhandled errors are automatically reported to Sentry:

1. **Access Sentry Dashboard:** [https://sentry.io](https://sentry.io)
2. **Project:** Hyderabadi Mehfil
3. **Alerts:**
   - Email alerts on error spikes
   - Slack integration for critical errors (configure in Sentry settings)

### Application Logs

Logs are available at runtime and captured by Sentry:

```typescript
import { log } from '@/lib/logger';

log.info('User action', { userId: user.id });
log.error('Operation failed', error);
```

Log levels:
- `debug` - Detailed development info (dev only)
- `info` - General information
- `warn` - Warning messages (potential issues)
- `error` - Error messages (problems)

### Performance Monitoring

Firebase Performance Monitoring tracks:
- Page load time
- Time to First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

Access via [Firebase Console](https://console.firebase.google.com) > Performance

### Uptime Monitoring

Set up external uptime monitoring:

```bash
# Using UptimeRobot (free):
# 1. Go to https://uptimerobot.com
# 2. Add monitor for https://www.hyderabadimehfil.co.uk
# 3. Set check interval: 5 minutes
# 4. Enable Slack/email alerts
```

---

## Firestore Backups

### Automatic Backups

Google Cloud Firestore includes daily automated backups. To view:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Navigate to Firestore > Backups
4. View recent automatic backups

Backups are retained for **35 days** by default.

### Manual Backup

Create manual backup:

```bash
gcloud firestore backups create \
  --collection-ids=reviews \
  --display-name="Manual backup $(date +%Y-%m-%d)" \
  --location=us-central1
```

Or via Firebase Console:
1. Firestore > Backups > Create Backup
2. Select collections
3. Choose retention period
4. Confirm

### Backup Verification

Check backup integrity weekly:

```bash
# List recent backups
gcloud firestore backups list --location=us-central1

# Verify backup size and date
gcloud firestore backups describe [BACKUP_ID] --location=us-central1
```

### Disaster Recovery

To restore from backup:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Firestore > Backups
3. Select backup to restore
4. Click "Restore"
5. **⚠️ This will overwrite current data - use with caution!**

---

## Data Retention & TTL

### Review Data Retention

Reviews are retained for **2 years** by default, then automatically deleted.

### TTL Configuration

To enable automatic TTL deletion:

1. **Firestore Console:**
   - Navigate to `reviews` collection
   - Click ⋮ > Edit collection settings
   - Enable TTL on `createdAt` field
   - Set to `2 years`

2. **Or via Cloud SDK:**
   ```bash
   gcloud firestore fields patch reviews \
     --database=your-db-id \
     --index-config-mode="NONE" \
     --ttl-config=2592000000
   ```

### GDPR Data Deletion

Users can request their data deletion. To implement:

1. **Create Cloud Function:**
   ```typescript
   // functions/deleteUserData.ts
   export const deleteUserData = onCall(async (request) => {
     const uid = request.auth?.uid;
     if (!uid) throw new Error('Not authenticated');
     
     // Delete all reviews by this user
     await db.collection('reviews')
       .where('authorUid', '==', uid)
       .get()
       .then(snap => {
         snap.docs.forEach(doc => doc.ref.delete());
       });
   });
   ```

2. **Call from React:**
   ```typescript
   import { httpsCallable } from 'firebase/functions';
   
   const deleteMyData = httpsCallable(functions, 'deleteUserData');
   await deleteMyData();
   ```

### Data Retention Audit

Monthly audit of data:

```bash
# Count reviews by age
gcloud firestore query run \
  --database=your-db-id \
  'SELECT * FROM reviews WHERE createdAt < TIMESTAMP(NOW() - 730d)'
```

---

## Security & Access Control

### Firestore Security Rules

Current security rules require:
- Email-verified Google authentication
- Owner-only mutations (except admin)
- Data validation on write
- Public read access for reviews list

Review rules in `firestore.rules`:

```bash
# Deploy updated rules
firebase deploy --only firestore:rules
```

### Admin Access

Admin email: `syed.sz.2126@gmail.com` (configured in firestore.rules)

To change admin email:

1. Edit `firestore.rules`
2. Update email in `isBootstrappedAdmin()` function
3. Deploy: `firebase deploy --only firestore:rules`

### API Key Management

Firebase API Key is public and safe for client-side use. If compromised:

1. **Regenerate in Firebase Console:**
   - Project Settings > API Keys
   - Delete old key
   - Create new key

2. **Update GitHub Secrets:**
   - Go to repository Settings > Secrets
   - Update `VITE_FIREBASE_API_KEY`

3. **Redeploy:**
   ```bash
   git push origin main
   ```

---

## Incident Response

### Error Spike Detected

If error rate spikes:

1. **Check Sentry:**
   - Identify common error message
   - Review affected users
   - Check error timeline

2. **Check Vercel:**
   - Verify deployment status
   - Check server logs
   - Review error traces

3. **Rollback if needed:**
   - Previous stable version available in Vercel deployments
   - Roll back via Vercel dashboard
   - Or use `git revert` and push

### Database Issues

If Firestore is experiencing issues:

1. **Check Firestore Status:**
   - [Firebase Status](https://status.firebase.google.com/)

2. **Check Firestore Quota:**
   - Firebase Console > Firestore > Usage
   - Verify quota not exceeded

3. **Scale down traffic:**
   - Implement circuit breaker
   - Show maintenance message
   - Reduce request rate

### Performance Degradation

If app is slow:

1. **Check Core Web Vitals:**
   - Firebase > Performance Monitoring
   - Identify slow operation

2. **Check bundle size:**
   ```bash
   npm run build
   # Analyze dist/ size
   ```

3. **Optimize:**
   - Code split by route
   - Lazy load components
   - Optimize images

---

## Troubleshooting

### Common Issues

#### "Firebase initialization failed"
- Check environment variables in `.env.local` or GitHub Secrets
- Verify Firebase project is active
- Check network connectivity

#### "Permission denied" on Firestore operations
- User must be email-verified
- Sign in with Google required
- Check Firestore security rules

#### "Sentry not initialized"
- Check `VITE_SENTRY_DSN` environment variable
- Optional - errors will log to console if Sentry not configured

#### "Rate limit exceeded"
- Wait 60 seconds before retrying
- Check browser console for error message
- Implement exponential backoff in retries

### Debug Mode

Enable debug logging:

```bash
# Set via environment
VITE_LOG_LEVEL=debug npm run dev
```

Or in code:

```typescript
import { log } from '@/lib/logger';
log.debug('Custom debug message', { context: 'value' });
```

### Performance Profiling

Profile bundle size:

```bash
npm run build
npm run preview

# Analyze with webpack-bundle-analyzer or similar
```

---

## Maintenance Schedule

### Daily
- Monitor error rate in Sentry
- Check uptime monitoring

### Weekly
- Review performance metrics
- Verify backup creation
- Check dependency security alerts

### Monthly
- Audit data retention
- Review access logs
- Update security rules if needed
- Rotate credentials

### Quarterly
- Full security audit
- Performance optimization review
- Cost analysis
- Disaster recovery drill

---

## Contact & Escalation

- **Project Lead:** Syed (syed.sz.2126@gmail.com)
- **Firebase Support:** [Firebase Console Support](https://console.firebase.google.com/support)
- **Vercel Support:** [Vercel Support](https://vercel.com/support)
- **Emergency:** Activate incident response protocol

---

**Last Updated:** 2026-11-19  
**Next Review:** 2026-12-19
