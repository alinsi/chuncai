import Deferred from "./lib/Deferred";
import * as storage from './lib/storage';
import * as animate from './lib/animate';
import * as _ from './lib/utils';
import { saveStorage } from "./lib/storage";
import { prependFn } from "./lib/decorators";
import { IOpt, IMenuItem } from "./Interface";


import './chuncai.scss';

export class Chuncai {
    //#region private fields
    /**
     * 菜单是否展开
     * 
     * @private
     * @type {boolean}
     * @memberof Chuncai
     */
    private menuOn: boolean = false;

    /**
     * 要循环骚操作的定时器
     * 
     * @private
     * @type {number}
     * @memberof Chuncai
     */
    private freeActionTimer: number;

    /**
     * 渐显文字的dfd
     * 
     * @private
     * @type {Deferred}
     * @memberof Chuncai
     */
    private freeSayDfd: Deferred = new Deferred().resolve();

    /**
     * 当前菜单配置
     * 
     * @private
     * @type {IOpt}
     * @memberof Chuncai
     */
    private opt: IOpt;

    //#endregion

    //#region private get fields
    /**
     * 春菜文字容器
     * 
     * @readonly
     * @private
     * @memberof Chuncai
     */
    private get eleNodeWord() {
        return <HTMLElement>document.getElementById('chuncai_word');
    }

    /**
     * 整个春菜
     * 
     * @readonly
     * @private
     * @memberof Chuncai
     */
    private get eleNodeMain() {
        return <HTMLElement>document.getElementById('chuncai_main');
    }

    /**
     * 春菜身体部分
     * 
     * @readonly
     * @private
     * @memberof Chuncai
     */
    private get eleNodeBody() {
        return <HTMLElement>document.getElementById('chuncai_body');
    }

    /**
     * 菜单容器
     * 
     * @readonly
     * @private
     * @memberof Chuncai
     */
    private get eleNodeMenu() {
        return <HTMLElement>document.getElementsByClassName('chuncai-menu')[0];
    }

    /**
     * 菜单toggle按钮
     * 
     * @readonly
     * @private
     * @memberof Chuncai
     */
    private get eleNodeMenuBtn() {
        return <HTMLElement>document.getElementsByClassName('chuncai-menu-btn')[0];
    }

    /**
     * 召唤按钮
     * 
     * @readonly
     * @private
     * @memberof Chuncai
     */
    private get eleNodeZhaohuan() {
        return document.getElementById('chuncai_zhaohuan');
    }
    //#endregion

    //#region private methods
    /**
     * 填充dom
     * 
     * @private
     * @memberof Chuncai
     */
    private fillDom(): void {
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
     * 填充菜单
     * 
     * @private
     * @param {Array<string>} [subMenus=[]] 
     * @memberof Chuncai
     */
    private fillMenu(subMenus: Array<string> = []): void {
        let menu: any = this.opt.menu;
        for (let i = 0, len = subMenus.length; i < len; i++) {
            menu = menu[subMenus[i]];
        }

        let menuArr = [];
        _.each(menu, (key, val) => {
            if (key == '$title') {
                return true;
            }
            let tempArr = subMenus.slice();
            tempArr.push(key);
            menuArr.push(`<span class="cc-cmd" data-cccmd="${tempArr.join('__')}">${key}</span>`);
        });
        this.eleNodeMenu.innerHTML = menuArr.join('');
    }

    /**
     * 绑定事件
     * 
     * @private
     * @memberof Chuncai
     */
    private evtSet(): void {
        // 可拖动，并防抖保存位置
        _.drag(this.eleNodeBody, this.eleNodeMain, _.debounce(saveStorage, 300));

        // 菜单
        this.eleNodeMenuBtn
            .addEventListener('click', () => {
                this.toggleMenu();
            });

        // 点击菜单项
        this.eleNodeMenu
            .addEventListener('click', ex => {
                let ele: HTMLElement = <HTMLElement>ex.target;
                if (!~ele.className.indexOf('cc-cmd')) {
                    return;
                }
                let cccmd = ele.getAttribute('data-cccmd') || '';
                this.choseItem(cccmd);
            }, true);

        this.eleNodeZhaohuan
            .addEventListener('click', () => {
                this.show();
            });
    }

    /**
     * 选择某一项
     * 
     * @private
     * @param {string} [cccmd=''] 
     * @memberof Chuncai
     */
    @prependFn(Chuncai.prototype.freeAction)
    private choseItem(cccmd = '') {
        let cmds = cccmd.split('__');
        let item: any = this.opt.menu; // 标签对应的指令项
        for (let i = 0, len = cmds.length; i < len; i++) {
            item = item[cmds[i]];
        }

        let actionDict = {
            /**
             * 字符串则直接输出
             * 
             * @param {string} content 
             */
            string: content => {
                this.freeSay(content);
                this.hideMenu()
                    .then(() => {
                        this.fillMenu();
                    });
            },
            /**
             * 方法直接调用
             * 
             * @param {function} func 
             */
            function: func => func(),
            /**
             * 菜单则填充
             * 
             */
            object: sender => {
                this.hideMenu()
                    .then(() => {
                        this.fillMenu(cmds);
                        this.showMenu();
                        if (sender['$title']) {
                            this.freeSay(sender['$title']);
                        }
                    });
            }
        };

        let itemType = _.getType(item);
        actionDict[itemType] && actionDict[itemType](item);
    }

    /**
     * 开始随机行为
     * 
     * @private
     * @param {boolean} [rightNow=false] 立即开始
     * @param {boolean} [interval=true] 是否循环
     * @memberof Chuncai
     */
    private freeAction(rightNow: boolean = false, interval: boolean = true): void {
        let fn = () => {

        };
        if (rightNow) {
            clearInterval(this.freeActionTimer);
            fn();
        }
        if (interval) {
            clearInterval(this.freeActionTimer);
            this.freeActionTimer = setInterval(() => this.freeAction(), 5000);
        }
    }

    /**
     * 渐显文字
     * 
     * @private
     * @param {string} content 
     * @memberof Chuncai
     */
    private freeSay(content: string): void {
        // 禁用之前的渐显
        this.freeSayDfd.disable();
        // 重置
        this.freeSayDfd = new Deferred().resolve();
        let delay = 80; // 速度80
        for (let i = 0, len = content.length; i < len; i++) {
            this.freeSayDfd.then(() => {
                this.eleNodeWord.innerHTML = content.substr(0, i + 1);
            }).delay(80);
        }
    }

    /**
     * 显示/隐藏 菜单
     * 
     * @private
     * @returns {Deferred} 
     * @memberof Chuncai
     */
    private toggleMenu(): Deferred {
        return this.menuOn ? this.hideMenu() : this.showMenu();
    }

    /**
     * 显示菜单
     * 
     * @private
     * @returns {Deferred} 
     * @memberof Chuncai
     */
    private showMenu(): Deferred {
        let dfd = new Deferred();
        if (this.menuOn) {
            dfd.resolve();
        }
        else {
            animate.slideDown(this.eleNodeMenu, 200, () => {
                this.menuOn = true;
                dfd.resolve();
            });
        }
        return dfd;
    }

    /**
     * 隐藏菜单
     * 
     * @private
     * @returns {Deferred} 
     * @memberof Chuncai
     */
    private hideMenu(): Deferred {
        let dfd = new Deferred();
        if (!this.menuOn) {
            dfd.resolve();
        }
        else {
            animate.slideUp(this.eleNodeMenu, 200, () => {
                this.menuOn = false;
                this.fillMenu();
                dfd.resolve();
            });
        }
        return dfd;
    }

    //#endregion

    //#region public methods
    /**
     * 初始化
     * 
     * @param {IOpt} opt 
     * @memberof Chuncai
     */
    public init(opt: IOpt): void {
        this.opt = opt;
        this.fillDom();
        this.fillMenu();
        this.evtSet();
        this.show();
    }

    /**
     * 显示春菜
     * 
     * @memberof Chuncai
     */
    @prependFn(Chuncai.prototype.freeAction)
    public show(): void {
        let pos = storage.getStorage();
        if (pos.x !== undefined) {
            this.eleNodeMain.style.left = pos.x + 'px';
            this.eleNodeMain.style.top = pos.y + 'px';
        }
        animate.fadeOut(this.eleNodeZhaohuan, 500);
        animate.fadeIn(this.eleNodeMain, 500, () => {
            this.freeSay('一起组团烧烤秋刀鱼');
        });
    }

    /**
     * 隐藏
     * 
     * @memberof Chuncai
     */
    public hide(): void {
        this.freeSay('记得叫我出来哦~');
        setTimeout(() => {
            animate.fadeOut(this.eleNodeMain, 500);
            animate.fadeIn(this.eleNodeZhaohuan, 500);
        }, 1000);
    }
    //#endregion
}

export default new Chuncai();