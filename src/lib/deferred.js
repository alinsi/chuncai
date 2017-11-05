/**
 * 工厂方法，返回 类deferred 异步对象
 * 
 * @export
 * @returns 
 */
export default function deferred() {
    let queue = [];  // 回调对列
    let statu = 0;   // 0-pending 1-fulfilled
    let invoking = false;  // 正在出列

    /**
     * 获取参数类型
     * 
     * @param {any} sender 要确定类型的参数
     * @returns {string}
     */
    function getType(sender) {
        return sender === null ?
            (sender + '') :
            Object.prototype.toString.call(sender).match(/\s(\S+?)\]$/)[1].toLowerCase();
    }

    /**
     * 出列
     */
    function next() {

        // 出列完毕
        if (!queue.length) {
            invoking = false;
            return;
        }

        invoking = true;

        let item = queue.shift(); // 取出第一项
        let itemType = getType(item);

        if (itemType == 'function') {
            item();
            next();
        }
        else if (itemType == 'number') {
            setTimeout(function () {
                next();
            }, item);
        }
    }

    let dfd = {};

    /**
     * 入列，添加回调
     * 
     * @param {function} cb 回调函数
     * @returns {deferred}
     */
    dfd.then = function (cb) {
        queue.push(cb);
        // fulfilled 且未有任务进行，则出列
        if (statu === 1 && !invoking) {
            next();
        }
        return this;
    };

    /**
     * 添加延时
     * 
     * @param {number} time 需要延时的毫秒数
     * @returns {deferred}
     */
    dfd.delay = function (time) {
        return this.then(time);
    };

    /**
     * 改变 deferred 状态
     */
    dfd.resolve = function () {
        statu = 1;
        next();
        return this;
    };

    return dfd;
}