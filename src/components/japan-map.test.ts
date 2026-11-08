import assert from "node:assert/strict";
import test from "node:test";
import { REGIONS } from "./japan-map-data.ts";

test("47都道府県すべてのブロックが存在する", () => {
  const totalRects = REGIONS.reduce(
    (sum, region) => sum + region.rects.length,
    0,
  );
  assert.equal(totalRects, 47, "全国47都道府県のブロックが存在すること");
});

test("各地方・地域のブロック数が正しい", () => {
  const countByName = Object.fromEntries(
    REGIONS.map((r) => [r.name, r.rects.length]),
  );

  assert.equal(countByName["北海道"], 1, "北海道: 1");
  assert.equal(countByName["東北"], 6, "東北: 6県");
  assert.equal(countByName["関東"], 7, "関東: 7都県");
  assert.equal(countByName["中部"], 9, "中部: 9県");
  assert.equal(countByName["近畿"], 7, "近畿: 7府県");
  assert.equal(countByName["中国"], 5, "中国: 5県");
  assert.equal(countByName["四国"], 4, "四国: 4県");
  assert.equal(countByName["九州"], 7, "九州: 7県");
  assert.equal(countByName["沖縄"], 1, "沖縄: 1県");
});
