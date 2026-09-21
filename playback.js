'use strict';

// Keep the geological timeline linear, but give each story time to be read.
// This helper has no browser dependencies so complete journeys can be tested.
const SolarPlayback = (() => {
  const TRAVEL_SECONDS = 90;
  const READING_SECONDS = 10;

  function indexAt(position, stops) {
    let index = 0;
    while (index < stops.length - 1 && position >= stops[index + 1]) index++;
    return index;
  }

  function duration(index, speed, stops) {
    if (index >= stops.length - 1) return 0;
    const span = stops[index + 1] - stops[index];
    const total = stops[stops.length - 1] - stops[0];
    return READING_SECONDS / Math.min(speed, 1.5) + span / total * TRAVEL_SECONDS / speed;
  }

  function progress(position, stops) {
    const index = indexAt(position, stops);
    if (index === stops.length - 1) return 1;
    return Math.max(0, (position - stops[index]) / (stops[index + 1] - stops[index]));
  }

  function advance(position, seconds, speed, stops) {
    const end = stops[stops.length - 1];
    let time = Math.max(stops[0], Math.min(position, end));
    let remaining = Math.max(0, seconds);
    while (remaining > 0 && time < end) {
      const index = indexAt(time, stops);
      const target = stops[index + 1];
      const rate = (target - stops[index]) / duration(index, speed, stops);
      const untilNext = (target - time) / rate;
      if (remaining < untilNext) {
        time += remaining * rate;
        remaining = 0;
      } else {
        time = target;
        remaining -= untilNext;
      }
    }
    return time;
  }

  return { indexAt, duration, progress, advance };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = SolarPlayback;
