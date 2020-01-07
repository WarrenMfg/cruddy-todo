const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
const index = require('./index');

// var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, 'utf8', (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
  // code here continues to run
}; // implicit return of undefined

const writeCounter = (count, callback) => {
  // var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, count, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, count);
    }
  });
};


// Public API - Fix this function //////////////////////////////////////////////
exports.getNextUniqueId = async function(err, id) {
  let counter = 0;

  if (id === 'id') {
    await readCounter(function(err, num) {
      counter = num + 1;
    });
    return zeroPaddedNumber(counter);
  } else if (id.length === 5) {
    writeCounter(id, index.createToDoTxt);
  }

  // return zeroPaddedNumber(counter);
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
