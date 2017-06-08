const fs = require('fs'),
      path  = require('path');

function contentType(fileType) {
  const ContentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/x-javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.mp3': 'audio/mp3',
  };
  const type = ContentType[fileType];
  return (type === void 0) ? 'text/plain' : type;
}

function readPostBody(req) {
  return new Promise(resolve => {
    let data = "";
    req.on('data', (thunk) => {
      data += thunk;
    });

    req.on('end', () => {
      resolve(data);
    });
  });
}


function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

module.exports = {
  contentType,
  readPostBody,
  readFile,
};
