const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = async (text, callback) => {
  // this will handle POST
  var id = await counter.getNextUniqueId(null, 'id');
  items[id] = text;
  console.log('items', items);
  callback(null, { id, text }); // sends data back to client

  // this will handle server stuff
  counter.getNextUniqueId(null, id); // padded id string
};


exports.createToDoTxt = (err, id) => {
  fs.writeFile(path.join(__dirname, 'data/', `${id}.txt`), items[id], (err) => {
    if (err) {
      throw ('error creating todo text file');
    }
  });
};

exports.readAll = (callback) => {
  console.log(items);
  var data = _.map(items, (text, id) => {
    return { id: id, text: id };
  });
  callback(null, data); // sends data to client
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
