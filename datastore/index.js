const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // this will handle POST
  counter.getNextUniqueId((err, id) => {
    items[id] = text;
    createToDoTxt(id);
    callback(null, { id, text }); // sends data back to client
  });
};

// we created this function
const createToDoTxt = (id) => {
  fs.writeFile(path.join(__dirname, 'data/', `${id}.txt`), items[id], (err) => {
    if (err) {
      throw ('error creating todo text file');
    }
  });
};

exports.readAll = (callback) => {
  fs.readdir(path.join(__dirname, 'data'), (err, files) => {
    if (err) {
      throw ('error reading all files', err);
    }
    var data = _.map(files, (fileName, i) => {
      if (files.length === 0) {
        return;
      }
      let name = fileName.split('.')[0]
      return { id: name, text: name };
    });
    callback(null, data); // sends data to client
  });
};

// does readAll make use of readOne???
exports.readOne = (id, callback) => {
  let filePath = path.join(__dirname, 'data', `${id}.txt`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      throw ('error reading one file', err);
    } else {
      callback(null, { id: id, text: data });
    }
  });
};

exports.update = (id, text, callback) => {
  let filePath = path.join(__dirname, 'data', `${id}.txt`);
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      throw ('error updating file', err);
    } else {
      callback(null, {id: id, text: text});
    }
  });
};

exports.delete = (id, callback) => {
  let filePath = path.join(__dirname, 'data', `${id}.txt`);
  fs.unlink(filePath, (err) => {
    if (err) {
      throw ('error deleting file', err);
    } else {
      callback();
    }
  })


  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
