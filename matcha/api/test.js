const faker = require('faker');

const user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  bio: faker.lorem.sentence(),
  image: faker.image.avatar(),
  image3: faker.image.avatar(),
  image4: faker.image.avatar(),
  image2: faker.image.avatar()
}

console.log(user);