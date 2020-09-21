'use strict';

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const Entity = function (kwargs) {
    for (const key in kwargs) {
        const setter = 'set' + key.capitalize();
        console.log(this[setter]);
        if (typeof this[setter] === 'function') {
            this[setter](kwargs[key]);
        }
    }
}

module.exports = Entity;