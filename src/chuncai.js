// import deferred from './lib/deferred';
// import * as storage from './lib/storage';
// import animate from './lib/animate';
// import * as _ from './lib/utils';

// import './chuncai.scss';

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
<div class="chuncai-main">
    <div class="chuncai-face chuncai-face-00">
        <div class="chuncai-face-eye"></div>
    </div>
    <div class="chuncai-chat">
        <div class="chuncai-word"></div>
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

    }
}

// export default new Chuncai();

// module.exports = new Chuncai();

export let chuncai = new Chuncai();