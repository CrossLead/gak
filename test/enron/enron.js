var EventRank = require('../../dist/node/index').EventRank,
    fs = require('fs'),
    ProgressBar = require('progress'),
    _ = require('lodash'),
    data = require('./mongo-enron.json');

var args = process.argv.slice(2).reduce(function(o, x) {
  var bits = x.split('=');
  o[bits[0]] = bits[1];
  return o;
}, {});




_.defaults(args, {
  m : 'baseline',
  n : 20,
  f : 0.2
})

rank(data);

function rank(events) {
  var R = new EventRank({
    events: events,
    model : args.m,
    G: 1*60*60,
    H: 1*24*60*60,
    f: parseFloat(args.f, 10)
  });

  var bar = new ProgressBar(
    '(:current/:total events processed) [:bar] :percent (:etas remaining)',
    { total: events.length, width: 50, renderThrottle: 1000 }
  );

  console.log('computing ranks...')
  for (var i=0, l=events.length; i<l; i++) {
    bar.tick();
    R.step(events[i]);
  }

  function pad(s, n) {
    var i = s.length;
    while(i < n + 5) {
      s += ' ';
      i++;
    }
    return s;
  }

  console.log('catching up non participants...');
  R.done();
  var top = R.top(parseInt(args.n, 10));
  var padN = _(top).pluck('id').map(function(x) { return x.length; }).max();
  console.log(pad('email:', padN) + 'value:');
  console.log('----------------------------------')
  top.forEach(function(rank) {
    console.log(pad(rank.id, padN) + rank.value);
  })
  console.log('done!');
}
