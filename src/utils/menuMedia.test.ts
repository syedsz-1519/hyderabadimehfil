import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BIRYANI_ITEMS,
  CONTACT_VIGNETTES,
  DAILY_WEEKEND_SPECIALS,
  GALLERY_ITEMS,
  LAMB_CURRIES,
  LASSI_ITEMS,
  MANDI_ITEMS,
  MURGH_CURRIES,
  PLATTER_ITEMS,
  POPULAR_MAIN_COURSES,
  RESTAURANT_INFO,
  ROTI_ITEMS,
  STARTERS_ITEMS,
  TANDOOR_ITEMS,
  VEG_ITEMS,
} from '../data/restaurantData';
import {
  findDuplicateImageUrls,
  findMissingMediaItems,
  formatMediaTime,
} from './menuMedia';

test('formatMediaTime formats seconds accurately', () => {
  assert.equal(formatMediaTime(0), '0:00');
  assert.equal(formatMediaTime(9), '0:09');
  assert.equal(formatMediaTime(65), '1:05');
  assert.equal(formatMediaTime(-5), '0:00');
  assert.equal(formatMediaTime(Number.NaN), '0:00');
});

test('every dish card across all Menu sections has an imageUrl', () => {
  const allMenuDishes = [
    ...DAILY_WEEKEND_SPECIALS,
    ...STARTERS_ITEMS,
    ...TANDOOR_ITEMS,
    ...PLATTER_ITEMS,
    ...BIRYANI_ITEMS,
    ...LAMB_CURRIES,
    ...MURGH_CURRIES,
    ...MANDI_ITEMS,
    ...VEG_ITEMS,
    ...ROTI_ITEMS,
    ...LASSI_ITEMS,
  ];
  assert.deepEqual(findMissingMediaItems(allMenuDishes), []);
});

test('no duplicate imageUrl exists across MenuPage dishes', () => {
  const allMenuDishes = [
    ...DAILY_WEEKEND_SPECIALS,
    ...STARTERS_ITEMS,
    ...TANDOOR_ITEMS,
    ...PLATTER_ITEMS,
    ...BIRYANI_ITEMS,
    ...LAMB_CURRIES,
    ...MURGH_CURRIES,
    ...MANDI_ITEMS,
    ...VEG_ITEMS,
    ...ROTI_ITEMS,
    ...LASSI_ITEMS,
  ];
  assert.deepEqual(findDuplicateImageUrls(allMenuDishes), []);
});

test('no duplicate images exist across HomePage sections or ContactPage vignettes', () => {
  const homeVisuals = [
    { id: 'home-hero', imageUrl: RESTAURANT_INFO.heroImageUrl },
    { id: 'home-story', imageUrl: RESTAURANT_INFO.storyImageUrl },
    ...POPULAR_MAIN_COURSES,
    ...GALLERY_ITEMS,
  ];
  assert.deepEqual(findDuplicateImageUrls(homeVisuals), []);

  const contactVisuals = [
    { id: 'contact-hero', imageUrl: RESTAURANT_INFO.contactHeroImageUrl },
    ...CONTACT_VIGNETTES.map((v, i) => ({ id: `vignette-${i}`, imageUrl: v.imageUrl })),
  ];
  assert.deepEqual(findDuplicateImageUrls(contactVisuals), []);
});
