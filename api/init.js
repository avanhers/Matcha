'use strict';

const faker = require('faker');
// const db = require('./config/db.config');

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

const genderType = [
    'male',
    'female',
];

const orientationType = [
    'hetero',
    'homo',
    'bi'
];

const getFakeData = function (number) {
    const ret = [];
    const gender = faker.random.arrayElement(genderType);
    const orientation = faker.random.arrayElement(orientationType);

    while (number--) {
        const user = [];
        const userName = faker.internet.userName();

        user.push(faker.internet.email());
        user.push(userName);
        user.push(faker.name.firstName(gender));
        user.push(faker.name.lastName());
        user.push('##########');
        user.push(orientation);
        user.push(faker.lorem.sentence());
        user.push(JSON.stringify({}));
        user.push(gender);
        user.push(0);
        user.push(faker.address.latitude());
        user.push(faker.address.longitude());
        ret.push(user);
    }
    return ret;
}

console.log(getFakeData(200));