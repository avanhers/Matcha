const obj = {
  name: "yo",
  age: 25,
  coucou: 13,
  hello: 10,
};

const items = ["name", "coucou"];

const keys = Object.keys(obj);
const res = keys.reduce((res, key) => {
  if (items.indexOf(key) > -1) {
    res[key] = obj[key];
  }
  return res;
}, {});
console.log(res);
