var EventRank = require('../../dist/node/index').EventRank,
    fastCsv = require('fast-csv'),
    fs = require('fs'),
    ProgressBar = require('progress');


var splitFrom = function(record) {
  record.to = record.to.split(',');
  record.time = parseInt(record.time, 10);
  return record;
};

var toCsv = function(data, filename, callback) {
  var csvStream = fastCsv
      .createWriteStream({headers: true}),
      writableStream = fs.createWriteStream(filename);

  writableStream.on('finish', function(){
    callback();
    console.log('Data written to ' + filename);
  });

  csvStream.pipe(writableStream);
  data.forEach(function(record) { csvStream.write(record) });
  csvStream.end();
}

var events = [];
fastCsv
  .fromStream(fs.createReadStream('./test/enron/enron_emails.csv'), {headers : true, object: true})
  .on('data', function(data){
    events.push(splitFrom(data));
  })
  .on('end', function(){
    var R = new EventRank({ events: events, model : 'reply' });

    var bar = new ProgressBar(
      '(:current/:total events processed) [:bar] :percent (:etas remaining)',
      { total: events.length, width: 50 }
    );

    console.log('computing ranks...')
    events.forEach(function(event) {
      bar.tick();
      R.step(event);
    })

    console.log('catching up non participants...');
    R.done();
    console.log('done!')
  });
