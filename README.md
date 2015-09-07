## _gak_ (Graph Analysis ToolKit for NodeJS)

[![npm version](https://badge.fury.io/js/gak.svg)](http://badge.fury.io/js/gak)
[![Bower version](https://badge.fury.io/bo/gak.svg)](http://badge.fury.io/bo/gak)
[![Build Status](https://travis-ci.org/CrossLead/gak.svg?branch=master)](https://travis-ci.org/CrossLead/gak)
[![Dependency Status](https://david-dm.org/crosslead/gak.svg)](https://david-dm.org/crosslead/gak)

### *Very Very Alpha, beware!*

### Installation

##### npm
```shell
npm install --save gak
```

##### bower
```shell
bower install --save gak
```

### Documentation

See http://crosslead.github.io/gak for [esdoc](https://github.com/esdoc/esdoc) generated documentation.

### Usage

##### EventRank

To calculate EventRanks of `correspondents` involved in a series of `events` sorted by time...

```javascript

import { EventRank } from 'gak';

/**
 * Events should be an Array of objects of the form...
 *    { time: <Number>, to: <String|Array<String>>, from: <String> }
 * sorted by the time property.
 *
 * NOTE: default parameters assume time is in unix timestamp format
 */
 const events = [ /* Add events here... */ ];

 const R = new EventRank({ events });

 for (const event of events) {
   // add event information to ranks
   R.step(event);
 }

 // finish rank calculation by computing lazy ranks
 R.done();

 console.log(R.ranks); // => { ranks... }
```



### Notes

Alorithm TODO:
  - EventRank (in progress...)
  - ECODE (Event based COmmunity DEtection)

Testing on enron email data:
  - run `node test/enron/enron.js` to run a reply model on `test/enron/enron_emails.csv`
  - *Reproducing the Enron email corpus*: Download the full dataset from https://www.cs.cmu.edu/~./enron/ (I got the May 7, 2015 Version of dataset). Move the tarball into `test/enron/`, unzip, and run `enron.py` to create a test csv dataset.
