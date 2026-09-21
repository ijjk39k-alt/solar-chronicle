'use strict';

// Schematic visual stages, not a physical simulation or precise forecast.
const SolarEvolution = (() => {
  const smooth = (a, b, value) => {
    const t = Math.max(0, Math.min(1, (value - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  function sun(year) {
    const first = smooth(5, 7.59, year) * (1 - smooth(7.59, 7.62, year));
    const second = smooth(7.64, 7.70, year) * (1 - smooth(7.80, 7.98, year));
    const remnant = smooth(7.80, 7.98, year);
    const pulseWindow = smooth(7.74, 7.75, year) * (1 - smooth(7.79, 7.80, year));
    // An illustrative oscillation tied to timeline position; it freezes on pause.
    const pulse = pulseWindow * Math.sin((year - 7.74) / .06 * Math.PI * 6);
    const heliumSize = 13 * smooth(7.59, 7.62, year);
    const radius = (35 + first * 81 + heliumSize + second * 56 + pulse * 9) * (1 - remnant) + 6 * remnant;
    // Allow for floating-point rounding when a timeline position becomes a year.
    const stageYear = year + 1e-10;
    const stage = stageYear >= 7.98 ? 'dwarf' : stageYear >= 7.80 ? 'ejection' : stageYear >= 7.74 ? 'pulses' : stageYear >= 7.68 ? 'second' : stageYear >= 7.62 ? 'helium' : 'first';
    return { radius, red: Math.max(first, second), remnant, stage, pulse };
  }
  function earth(year) {
    // The dates below are illustrative transitions within uncertain intervals.
    return {
      dry: smooth(1.5, 3, year),
      oxygen: year < 0 ? smooth(-2.5, -2.3, year) : 1 - smooth(.9, 1.3, year),
      supercontinent: smooth(.20, .25, year) * (1 - smooth(1.2, 1.5, year))
    };
  }
  return { sun, earth };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = SolarEvolution;
