const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const evolution = require('../evolution.js');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const data = vm.runInNewContext(read('events.js') + '\n' + read('stories.js') + '\n({historyEvents,bodyEvents,sources,contextStories,encyclopedia})');
const { historyEvents: events, bodyEvents, sources, contextStories: stories } = data;

test('all events and supplemental stories have working data references', () => {
  const ids = new Set(events.map(event => event.id));
  assert.equal(ids.size, events.length);
  events.forEach((event, i) => {
    assert.ok(Number.isFinite(event.year));
    if (i) assert.ok(event.year > events[i - 1].year, 'Dates must be distinct and ordered');
    assert.ok(event.focus >= -1 && event.focus <= 7);
    for (const field of ['title', 'body', 'note', 'date', 'badge']) assert.ok(event[field]);
  });
  for (const item of [...events, ...stories]) {
    assert.ok(item.refs.length);
    for (const ref of item.refs) assert.match(sources[ref]?.[1] || '', /^https:\/\//);
  }
  for (const list of Object.values(bodyEvents)) {
    assert.equal(list.length, new Set(list).size);
    for (const id of list) assert.ok(ids.has(id), id);
  }
  for (const story of stories) {
    assert.ok(!('year' in story), 'Uncertain context must not receive a made-up date');
    for (const anchor of story.anchors) assert.ok(ids.has(anchor), anchor);
  }
});

test('key Earth history and future events appear in the Earth encyclopedia', () => {
  for (const id of ['moon-impact','early-oceans','early-life','great-oxidation','cambrian','permian-extinction','dinosaurs-mammals','chicxulub','human-origins','future-supercontinent','future-oxygen','future-water']) {
    assert.ok(bodyEvents.earth.includes(id), id);
  }
  const date = id => events.find(event => event.id === id).year;
  assert.ok(date('moon-impact') < date('early-oceans'));
  assert.ok(date('early-life') < date('cambrian'));
  assert.ok(date('permian-extinction') < date('chicxulub'));
  assert.ok(date('future-supercontinent') < date('future-oxygen'));
  assert.ok(date('future-oxygen') < date('future-water'));
});

test('solar visuals shrink between two giant stages, then become a remnant', () => {
  const first = evolution.sun(7.59);
  const helium = evolution.sun(7.62);
  const second = evolution.sun(7.70);
  const dwarf = evolution.sun(8);
  assert.ok(first.radius > helium.radius);
  assert.ok(helium.radius > evolution.sun(0).radius);
  assert.ok(second.radius > helium.radius);
  assert.ok(dwarf.radius < helium.radius);
  assert.equal(helium.stage, 'helium');
  assert.equal(second.stage, 'second');
  assert.equal(dwarf.stage, 'dwarf');
  for (const year of [7.62,7.70,7.74,7.79]) assert.equal(evolution.sun(year).remnant, 0);
  assert.notEqual(evolution.sun(7.765).pulse, evolution.sun(7.775).pulse);
  for (let year = 5; year <= 8; year += .001) assert.ok(evolution.sun(year).radius > 0);
});

test('oxygen loss does not imply an immediately dry planet; dry appearance persists', () => {
  assert.equal(evolution.earth(0).dry, 0);
  assert.equal(evolution.earth(1.08).dry, 0);
  assert.ok(evolution.earth(1.08).oxygen < evolution.earth(0).oxygen);
  assert.equal(evolution.earth(4).dry, 1);
  assert.ok(evolution.earth(.25).supercontinent > 0);
});

test('HTML loads data and helpers before the app and every UI binding exists', () => {
  const html = read('index.html');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  const app = read('app.js');
  for (const [, id] of app.matchAll(/\$\('([^']+)'\)/g)) assert.ok(ids.includes(id), id);
  for (const [, id] of app.matchAll(/\bui\.([a-zA-Z]+)\b/g)) assert.ok(ids.includes(id), id);
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(scripts, ['./events.js','./stories.js','./evolution.js','./playback.js','./app.js']);
  for (const [, asset] of html.matchAll(/(?:src|href)="(\.[^"]+)"/g)) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', asset)), asset);
  }
  assert.ok(!/(?:src|href)="\//.test(html));
});
