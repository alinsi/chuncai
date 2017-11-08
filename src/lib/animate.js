import deferred from './deferred';
import { invokeCalling } from './frame';

/**
 * 缓动函数
 * 
 * @param {*} t current time（当前时间
 * @param {*} b beginning value（初始值）
 * @param {*} c change in value（变化量）
 * @param {*} d duration（持续时间）
 */
let easeInOut = function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

export default function animate(from, to, duration, fn) {
    let dfd = deferred();
    let timeFrom = +new Date;

    invokeCalling(function () {
        let t = +new Date;

        // 如果时间到了
        if (t - timeFrom >= duration) {
            fn(to);
            dfd.resolve();
        }

        let b = from;
        let c = to - from;
        let d = duration;
        let result = easeInOut(t, b, c, d);
        fn(Math.ceil(result));
        dfd.resolve();
    }, dfd);
}

