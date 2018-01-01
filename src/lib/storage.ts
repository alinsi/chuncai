const key = 'chuncai';
/**
 * 获取sessionStorage中存储的信息
 * 
 * @export
 * @returns {any}
 */
export function getStorage() {
    let content = sessionStorage[key] || '{}';
    return JSON.parse(content);
}
/**
 * 将信息存储到sessionStorage中
 * 
 * @export
 * @param {any} config 
 */
export function saveStorage(config) {
    let content = JSON.stringify(config);
    sessionStorage[key] = content;
}