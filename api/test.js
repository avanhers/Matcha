class test {
  name = 'jaegle';
  firstname = 'jules';
  age = 28;

  constructor(name) {
    this.name = name;
  }

  calle() {
    console.log(`my name is ${this.firstname} ${this.name}`);
  }
}

const obj = {
  a: 12,
  b() {
    console.log('yo');
  },
  c() {
    this.b();
  }
}

const jules = new test('jaegle');

jules.calle()
console.log(Object.keys(jules));

obj.c()