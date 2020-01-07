const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

exports.readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      return callback(null, 0);
    } else {
      return callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      return callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////
const identity = (err, val) => {
  console.log('IDENTITY', typeof val);
  return val;
};

exports.getNextUniqueId = (err, id) => {
  console.log('GETNEXTUNIQUEID:', err, id);
  id = id + 1;
  return writeCounter(id, identity);
  // return zeroPaddedNumber(counter);
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
