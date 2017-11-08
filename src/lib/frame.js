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
 * 帧动画循环调用某个函数
 * 
 * @export
 * @param {function} fn 
 * @param {deferred} dfd 
 * @returns 
 */
export function invokeCalling(fn, dfd) {
    let goon = true;
    dfd.then(() => goon = false);
    (function invokeRequestAnimationFrame() {
        if (!goon) return;
        fn();
        invokeRequestAnimationFrame();
    })();
    return dfd;
}