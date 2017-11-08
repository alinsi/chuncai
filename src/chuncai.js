import deferred from './lib/deferred';

import { getStorage, saveStorage } from './lib/storage';

import animate from './lib/animate';

class Chuncai {
    constructor() {

    }

    _init() {

    }
}

animate(0, 100, 3000, function (n) {
    console.log(n);
});