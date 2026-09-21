const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const playback = require('../playback.js');

const data = fs.readFileSync(path.join(__dirname, '../events.js'), 'utf8');
const years = vm.runInNewContext(data + '\nhistoryEvents.map(event => event.year)');
const stops = Array.from(years, year => (year + 4.6) / 12.6 * 7);
const end = stops.at(-1);
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);

for (const speed of [0.5, 1, 2]) {
  test(`whole journey at ${speed}× moves on every frame and visits every event`, () => {
    let time = 0;
    let seconds = 0;
    const seen = new Set([0]);
    const expected = stops.slice(0, -1).reduce((sum, _, i) => sum + playback.duration(i, speed, stops), 0);
    while (time < end && seconds < expected + 1) {
      const next = playback.advance(time, 1 / 60, speed, stops);
      assert.ok(next > time, 'timeline must never hold at an event');
      assert.ok(next <= end, 'timeline must not overshoot or wrap');
      time = next;
      seconds += 1 / 60;
      seen.add(playback.indexAt(time, stops));
    }
    assert.equal(time, end);
    assert.equal(seen.size, stops.length);
    assert.ok(Math.abs(seconds - expected) < 1 / 60 + 1e-6);
    for (let i = 0; i < stops.length - 1; i++) {
      assert.ok(playback.duration(i, speed, stops) >= 10 / Math.min(speed, 1.5));
    }
  });
}

test('expanded journey keeps the solar-system endpoints and stays under nine minutes at 1×', () => {
  assert.equal(years[0], -4.6);
  assert.equal(years.at(-1), 8);
  assert.equal(stops.length, 44);
  const seconds = stops.slice(0, -1).reduce((sum, _, i) => sum + playback.duration(i, 1, stops), 0);
  near(seconds, 520);
  assert.ok(seconds < 540);
});

test('an event changes at its true date and leftover frame time continues forward', () => {
  const firstDuration = playback.duration(0, 1, stops);
  const justBefore = playback.advance(0, firstDuration - 0.001, 1, stops);
  assert.equal(playback.indexAt(justBefore, stops), 0);
  const after = playback.advance(justBefore, 0.01, 1, stops);
  assert.equal(playback.indexAt(after, stops), 1);
  assert.ok(after > stops[1]);
  near(playback.advance(0, firstDuration, 1, stops), stops[1]);
});

test('resume and speed changes preserve position without returning to a story start', () => {
  const position = stops[10] + (stops[11] - stops[10]) * 0.4;
  near(playback.advance(position, 0, 2, stops), position);
  near(playback.progress(position, stops), 0.4);
  assert.ok(playback.advance(position, 0.1, 2, stops) > playback.advance(position, 0.1, 0.5, stops));
  const split = playback.advance(playback.advance(position, 0.1, 1, stops), 0.2, 1, stops);
  near(split, playback.advance(position, 0.3, 1, stops));
});

test('ending stays on the last event until an explicit restart', () => {
  assert.equal(playback.advance(end, 100, 1, stops), end);
  assert.equal(playback.advance(0, 10000, 2, stops), end);
  assert.equal(playback.progress(end, stops), 1);
  assert.equal(playback.indexAt(end, stops), stops.length - 1);
  assert.ok(playback.advance(0, 0.1, 1, stops) > 0);
});
