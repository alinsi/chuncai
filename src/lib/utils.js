/**
 * 获取参数类型
 * 
 * @param {any} sender 要确定类型的参数
 * @returns {string}
 */
export function getType(sender) {
    return sender === null ?
        (sender + '') :
        Object.prototype.toString.call(sender).match(/\s(\S+?)\]$/)[1].toLowerCase();
}

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
            fn.apply(this, args);
        }, delay);
    }
}

//#region 拖动

/**
 * 获取鼠标位置
 * 
 * @param {MouseEvent} event 
 * @returns 
 */
function getMousePos(event) {
    return {
        x: event.clientX,
        y: event.clientY
    };
}

/**
 * 获取元素位置
 * 
 * @param {HTMLElement} eleNode 
 * @returns 
 */
function getElePos(eleNode) {
    let style = window.getComputedStyle(eleNode);
    return {
        x: parseFloat(style.left),
        y: parseFloat(style.top)
    };
}

/**
 * 使元素可拖动
 * 
 * @param {HTMLElement} targetNode 有效拖动区域的元素
 * @param {HTMLElement} dragNode 被拖动的目标元素
 * @param {function} callback 
 */
export function drag(targetNode, dragNode, callback) {
    let canMove = false;// 是否可以移动
    let startPos = { x: 0, y: 0 }; // 起始坐标

    targetNode.addEventListener('mousedown', event => {
        canMove = true;
        startPos = getMousePos(event);
    });

    document.addEventListener('mouseup', () => {
        canMove = false;
    });

    document.addEventListener('mousemove', event => {
        if (!canMove) return;

        let mousePos = getMousePos(event);

        let offsetX = mousePos.x - startPos.x;  // x轴偏移量
        let offsetY = mousePos.y - startPos.y;  // y轴偏移量

        startPos = getMousePos(event);

        let elePos = getElePos(dragNode);
        let newPos = {
            x: elePos.x + offsetX,
            y: elePos.y + offsetY
        };
        dragNode.style.left = newPos.x + 'px';
        dragNode.style.top = newPos.y + 'px';
        callback && callback(newPos);
    });
}
//#endregion