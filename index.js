import HashMap from "./HashMap.js";

function assert(condition, message) {
  if (!condition) {
    console.error("❌ FAIL:", message);
  } else {
    console.log("✅ PASS:", message);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌ FAIL: ${message}
   Expected: ${expected}
   Received: ${actual}`);
  } else {
    console.log("✅ PASS:", message);
  }
}

function runTests() {
  console.log("Running HashMap Tests...\n");

  // -------------------------
  // Constructor
  // -------------------------
  const map = new HashMap();
  assertEqual(map.capacity, 16, "Default capacity is 16");
  assertEqual(map.length(), 0, "Initial length is 0");

  // -------------------------
  // set & get
  // -------------------------
  map.set("a", 1);
  assertEqual(map.get("a"), 1, "Set and get works");

  map.set("a", 2);
  assertEqual(map.get("a"), 2, "Updating existing key works");
  assertEqual(map.length(), 1, "Length does not increase when updating key");

  assertEqual(map.get("missing"), undefined, "Getting missing key returns undefined");

  // -------------------------
  // has
  // -------------------------
  assert(map.has("a") === true, "Has returns true for existing key");
  assert(map.has("x") === false, "Has returns false for missing key");

  // -------------------------
  // remove
  // -------------------------
  assert(map.remove("a") === true, "Remove returns true when key exists");
  assertEqual(map.get("a"), undefined, "Key removed successfully");
  assertEqual(map.length(), 0, "Length decreases after removal");

  assert(map.remove("a") === false, "Remove returns false for non-existing key");

  // -------------------------
  // Collision handling
  // -------------------------
  const collisionMap = new HashMap(1); // force collisions
  collisionMap.set("a", 1);
  collisionMap.set("b", 2);

  assertEqual(collisionMap.get("a"), 1, "Collision key A works");
  assertEqual(collisionMap.get("b"), 2, "Collision key B works");
  assertEqual(collisionMap.length(), 2, "Collision length correct");

  // -------------------------
  // Resize
  // -------------------------
  const resizeMap = new HashMap(4, 0.5);
  resizeMap.set("a", 1);
  resizeMap.set("b", 2); // triggers resize

  assert(resizeMap.capacity === 8, "Resize doubles capacity");
  assertEqual(resizeMap.get("a"), 1, "Data preserved after resize (a)");
  assertEqual(resizeMap.get("b"), 2, "Data preserved after resize (b)");

  // -------------------------
  // length
  // -------------------------
  resizeMap.set("c", 3);
  assertEqual(resizeMap.length(), 3, "Length reflects correct number of elements");

  // -------------------------
  // clear
  // -------------------------
  resizeMap.clear();
  assertEqual(resizeMap.length(), 0, "Clear resets length");
  assertEqual(resizeMap.capacity, 16, "Clear resets capacity to 16");

  // -------------------------
  // keys
  // -------------------------
  const keysMap = new HashMap();
  keysMap.set("x", 10);
  keysMap.set("y", 20);

  const keys = keysMap.keys();
  assert(keys.includes("x"), "Keys includes x");
  assert(keys.includes("y"), "Keys includes y");
  assertEqual(keys.length, 2, "Keys length correct");

  // -------------------------
  // values
  // -------------------------
  const values = keysMap.values();
  assert(values.includes(10), "Values includes 10");
  assert(values.includes(20), "Values includes 20");
  assertEqual(values.length, 2, "Values length correct");

  // -------------------------
  // entries
  // -------------------------
  const entries = keysMap.entries();
  const hasEntryX = entries.some(e => e[0] === "x" && e[1] === 10);
  const hasEntryY = entries.some(e => e[0] === "y" && e[1] === 20);

  assert(hasEntryX, "Entries includes [x,10]");
  assert(hasEntryY, "Entries includes [y,20]");
  assertEqual(entries.length, 2, "Entries length correct");

  // -------------------------
  // Numeric keys
  // -------------------------
  const numMap = new HashMap();
  numMap.set(123, "number");
  assertEqual(numMap.get(123), "number", "Numeric key works");

  // -------------------------
  // Object keys (by reference)
  // -------------------------
  const obj = { a: 1 };
  const objMap = new HashMap();
  objMap.set(obj, "value");

  assertEqual(objMap.get(obj), "value", "Object key works by reference");
  assert(objMap.get({ a: 1 }) === undefined, "Different object reference is different key");

  console.log("\nAll tests finished.");
}

runTests();