import deferred from './lib/deferred';
import * as storage from './lib/storage';
// import animate from './lib/animate';
// import * as _ from './lib/utils';

import { drag, throttle } from './lib/utils';

import './chuncai.scss';
import { saveStorage } from './lib/storage';

class Chuncai {
    constructor() {
        // console.log('lalla');
    }
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

        let tagContent = '<a class="chuncai-zhaohuan" href="javascript:;">召唤春菜</a>';
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
        drag(targetNode, dragNode, throttle((pos) => {
            saveStorage(pos);
            console.log(pos);
        }, 300));
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
        this._sayWordDfd = deferred();
        let delay = 600;
        let eleNode = document.getElementById('chuncai_word');
        for (let i = 0, len = content.length; i < len; i++) {
            this._sayWordDfd.then(() => {
                eleNode.innerHTML = content.substr(0, len);
            }).delay(delay);
        }
        this._sayWordDfd.resolve();
    }

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

        this._sayWord('fdjsafjdsafjlkajfdksafjsdfjaldsf');
    }
}

export default new Chuncai();