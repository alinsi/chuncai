/**
 * requestAnimationFrame 兼容
 */
let requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || function (fn) {
        setTimeout(function () {
            fn();
        }, 17);
    };

let queue = [];