# Hyderabadi Mehfil — Firestore Security Specification

## Data Invariants
1. All `/reviews/{reviewId}` documents belong to an email-verified authenticated diner (`authorUid == request.auth.uid`).
2. Star ratings are strictly integers between `1` and `5`.
3. Text fields (`name`, `subtitle`, `quote`) enforce strict min/max character limits matching `firebase-blueprint.json` (`name`: 2–60, `subtitle`: 2–60, `quote`: 10–500).
4. `createdAt` must equal `request.time` on creation and cannot be mutated on update.
5. `authorUid` is immutable after creation; only the author or a verified bootstrapped admin may delete a review.
6. No PII (`email`, `phone`, `address`) is stored in `/reviews`.

## Dirty Dozen Payloads (Expected: PERMISSION_DENIED)
1. Unauthenticated `create` on `/reviews/rev1`.
2. Authenticated `create` with `email_verified: false`.
3. `create` with spoofed `authorUid != request.auth.uid`.
4. `create` with extra shadow field (`isFeatured: true`).
5. `create` with `stars: 6` (out of range).
6. `create` with `stars: 4.5` (non-integer float).
7. `create` with `quote` shorter than 10 chars or exceeding 500 chars.
8. `create` with `name` exceeding 60 chars.
9. `create` with forged past `createdAt` timestamp (`!= request.time`).
10. `create` with oversized or invalid document ID (`../../bad_id` or >128 chars).
11. `update` attempting to mutate `authorUid` or `createdAt` or add an unknown field.
12. `delete` by a non-owner non-admin authenticated user.
