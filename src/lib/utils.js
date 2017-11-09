/**
 * 函数节流
 * 
 * @export
 * @param {function} fn 
 * @param {number} delay 
 * @returns {function}
 */
export function throttle(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, ...args);
        }, delay);
    }
}