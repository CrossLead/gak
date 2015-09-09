import _ from 'lodash';
import ProgressBar from 'progress';
import { EventRank, util } from '../../dist/node/index';

const args = process
  .argv
  .slice(2)
  .reduce((o, x) => {
    const [key, val] = x.split('=');
    o[key] = val;
    return o;
  }, {
    m : 'reply',
    n : 20,
    f : 0.9,
    file: './mongo-enron.json'
  });

console.log('importing data...');
const events = _(require(args.file))
  .filter(x => x.to.length && x.from && x.time)
  .map(e => {
    e.time = parseInt(e.time, 10);
    return e;
  })
  .sortBy('time')
  .value();

console.log('intializing EventRank...');
const R = new EventRank({
  events,
  model : args.m,
  G: 1*60*60,
  H: 1*24*60*60,
  f: parseFloat(args.f, 10)
});

const rankBar = new ProgressBar(
  '(:current/:total events processed) [:bar] :percent (:etas remaining)',
  { total: events.length, width: 50, renderThrottle: 1000 }
);

const catchUpBar = new ProgressBar(
  '(:current/:total correspondents processed) [:bar] :percent (:etas remaining)',
  { total: R.correspondents.length, width: 50, renderThrottle: 1000 }
);

function pad(s, n) {
  let i = s.length;
  while(i < n + 5) {
    s += ' ';
    i++;
  }
  return s;
}

console.log('computing ranks...')
console.time('EventRank');

let lagTime = 0;

events.forEach(event => {
  util.assert(lagTime <= event.time, 'time should be increasing');
  R.step(event);
  lagTime = event.time;
  rankBar.tick();
});

console.log('catching up non participants...');
R.correspondents.forEach(c => {
  R.catchUp(c);
  catchUpBar.tick();
});

console.timeEnd('EventRank');

const top = R.top(parseInt(args.n, 10));
const padN = _(top).pluck('id').pluck('length').max();

console.log(pad('email:', padN) + 'value:');
console.log('----------------------------------');

top.forEach(rank => {
  console.log(pad(rank.id, padN) + rank.value);
});

console.log('done!');
