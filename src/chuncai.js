import deferred from './lib/deferred';
import * as storage from './lib/storage';
import animate from './lib/animate';
// import * as _ from './lib/utils';

import * as _ from './lib/utils';

import './chuncai.scss';
import { saveStorage } from './lib/storage';

/**
 * 用于生产老婆的类，只能用于单例
 * 
 * @class Chuncai
 */
class Chuncai {
    constructor() {

    }
    //#region private methods
    /**
     * 初始化
     * 
     * @memberof Chuncai
     */
    init() {
        this._fillDom();
        this._evtSet();
        this.show();
    }
    /**
     * 填充dom
     * 
     * @memberof Chuncai
     */
    _fillDom() {
        let wrap = document.createElement('div');

        let tagContent = '<a id="chuncai_zhaohuan" class="chuncai-zhaohuan" href="javascript:;">召唤春菜</a>';
        wrap.innerHTML = tagContent;
        let tagNode = wrap.children[0];
        document.body.appendChild(tagNode);

        let mainContent = `
<div id="chuncai_main" class="chuncai-main">
    <div id="chuncai_body" class="chuncai-face chuncai-face-00">
        <div class="chuncai-face-eye"></div>
    </div>
    <div class="chuncai-chat">
        <div id="chuncai_word" class="chuncai-word"></div>
        <div class="chuncai-menu"></div>
        <div class="chuncai-menu-btn">menu</div>
    </div>
</div>`;
        wrap.innerHTML = mainContent;
        let mainNode = wrap.children[0];
        document.body.appendChild(mainNode);
    }
    /**
     * 事件绑定
     * 
     * @memberof Chuncai
     */
    _evtSet() {
        // 整个春菜
        let dragNode = document.getElementById('chuncai_main');
        // 春菜身体，可拖动
        let targetNode = document.getElementById('chuncai_body');
        // 可拖动，并节流保存位置
        _.drag(targetNode, dragNode, _.debounce(saveStorage, 300));
    }

    /**
     * 渐显文字
     * 
     * @param {string} content 
     * @memberof Chuncai
     */
    _sayWord(content) {
        if (this._sayWordDfd) {
            this._sayWordDfd.disable();
        }
        this._sayWordDfd = deferred().resolve();
        let delay = 80;
        let eleNode = document.getElementById('chuncai_word');
        for (let i = 0, len = content.length; i < len; i++) {
            this._sayWordDfd.then(() => {
                eleNode.innerHTML = content.substr(0, i + 1);
            }).delay(delay);
        }
    }
    //#endregion

    /**
     * 显示春菜
     * 
     * @memberof Chuncai
     */
    show() {
        let pos = storage.getStorage();
        let eleNode = document.getElementById('chuncai_main');
        if (pos.x !== undefined) {
            eleNode.style.left = pos.x + 'px';
            eleNode.style.top = pos.y + 'px';
        }

        this._sayWord('一起组团烧烤秋刀鱼');
    }
    
    /**
     * 隐藏
     * 
     * @memberof Chuncai
     */
    hide() {
        this._sayWord('记得叫我出来哦~');
        let eleNode = document.getElementById('chuncai_main');
        let tipNode = document.getElementById('chuncai_zhaohuan');
        let dfd = deferred().resovle();
        dfd.delay(1000).then(() => {
            animate(1, 0, 1000, n => {
                eleNode.style.opacity = n;
                tipNode.style.opacity = 1 - n;
            });
        });
    }
}

export default new Chuncai();