const bcrypt = require('bcrypt');

async function getHash() {
  let ret;

  await bcrypt.hash('yo', 0, (err, hash) => {
    ret = hash;
  });
  console.log('1');
  return ret;
}

const hash = getHash().then(val => {
  console.log('hash= ' + val);
});
