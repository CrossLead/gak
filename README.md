## _gak_ (JavaScript Graph Analysis Kit for Event-Based Network Data)

[![npm version](https://badge.fury.io/js/gak.svg)](http://badge.fury.io/js/gak)
[![Bower version](https://badge.fury.io/bo/gak.svg)](http://badge.fury.io/bo/gak)
[![Build Status](https://travis-ci.org/CrossLead/gak.svg?branch=master)](https://travis-ci.org/CrossLead/gak)
[![Dependency Status](https://david-dm.org/crosslead/gak.svg)](https://david-dm.org/crosslead/gak)

### *Very Very Alpha, beware!*

### Overview

`gak.EventRank` provides an implementation of the EventRank algorithm put forth by (O’Madadhain & Smyth, 2005), see http://www.datalab.uci.edu/papers/linkkdd05-02.pdf. Further development goals include adding ECODE for event based clustering, as well as other static graph analysis algorithms.


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

 // compute EventRank values
 R.compute();

 console.log(R.ranks); // => { ranks... }
```
