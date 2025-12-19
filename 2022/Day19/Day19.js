const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

// greed for obsidian maybe?

// probably need some ratio of ore:clay:obsidian:geode materials

// create enough obsidian but still have enough ore to make the geode robot