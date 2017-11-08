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

/**
 * 动画函数，用于linear执行某个变化
 * 
 * @export
 * @param {number} from 起始值
 * @param {number} to 目标值
 * @param {number} duration 持续时间
 * @param {function} stepFn 每次变化执行的回调
 */
export default function animate(from, to, duration, stepFn) {
    let startTime = +new Date;  // 动画开始时间
    let diff = to - from;       // 位移偏差量

    (function invokeAnimate() {
        let timeSpan = +new Date - startTime; // 时间差
        if (timeSpan > duration) {
            stepFn(to);
            return;
        }
        let result = timeSpan * diff / duration + from;
        stepFn(result);
        requestAnimationFrame(invokeAnimate);
    })();
}