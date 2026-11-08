import assert from "node:assert/strict";
import test from "node:test";
import {
  NEW_LISTING_DURATION_MS,
  isNewListing,
} from "./new-listing.ts";

const listed = "2026-11-08T01:54:18.412Z";
const now = Date.parse("2026-11-12T00:00:00.000Z");

test("初掲載から14日以内はNEW", () => {
  assert.equal(isNewListing(listed, now), true);
  assert.equal(
    isNewListing(listed, Date.parse(listed) + NEW_LISTING_DURATION_MS),
    false,
  );
});

test("掲載日がない、未来の日付、不正な現在時刻はNEWにしない", () => {
  assert.equal(isNewListing(undefined, now), false);
  assert.equal(isNewListing(listed, Date.parse(listed) - 1), false);
  assert.equal(isNewListing(listed, Number.NaN), false);
});
