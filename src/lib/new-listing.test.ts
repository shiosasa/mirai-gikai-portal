import assert from "node:assert/strict";
import test from "node:test";
import {
  NEW_LISTING_DURATION_MS,
  catalogStartedAt,
  isNewListing,
} from "./new-listing.ts";

const seed = "2026-11-08T01:54:18.412Z";
const added = "2026-11-10T00:00:00.000Z";
const now = Date.parse("2026-11-12T00:00:00.000Z");

test("初期の一括登録はNEWにしない", () => {
  const start = catalogStartedAt([seed, seed, added]);
  assert.equal(start, seed);
  assert.equal(isNewListing(seed, now, start), false);
});

test("一括登録より後の掲載は14日以内ならNEW", () => {
  assert.equal(isNewListing(added, now, seed), true);
  assert.equal(
    isNewListing(added, Date.parse(added) + NEW_LISTING_DURATION_MS, seed),
    false,
  );
});

test("掲載日がない、未来の日付、不正な現在時刻はNEWにしない", () => {
  assert.equal(isNewListing(undefined, now, seed), false);
  assert.equal(isNewListing(added, Date.parse(added) - 1, seed), false);
  assert.equal(isNewListing(added, Number.NaN, seed), false);
});
