# chuncai
A lovely Page Wizard, is responsible for selling moe...

一个可爱的页面导航精灵，负责卖萌。

![image](https://raw.githubusercontent.com/shalldie/chuncai/master/GIF.gif)

## Installation

    npm install chuncai

## Usage & Example

在 **es module** 中拿到chuncai对象(**commonjs和window** 中需要从 **default** 属性上获取)，调用 **init** 方法初始化。  
**chuncai.init(opt:IOpt)**

* **words** 是一个数组: **Array<string>**，存放春菜闲暇时候说的话。
* **menu** 是菜单: *IOpt*，其中：

1. **object** 表示子菜单
2. key **$title** 是在展开子菜单的时候，春菜要说的话
3. **string** 表示点击后要说的话
4. **Function** 是点击后要执行的方法

可查看如下 example 和 interface 。

```js
// es module、typescript
import chuncai from 'chuncai';
// commonjs
//let chuncai = require('chuncai').default; 
// window
//var chuncai = window['chuncai'].default; 

const opt = {
    menu: {
        $title: '你想做什么呢？',
        '关于春菜': function () {
            window.open('https://github.com/shalldie/chuncai');
        },
        '存活时间': '咱已经和主人共同度过了 ' + Math.floor((+new Date - 1456998485780) / (1000 * 60 * 60 * 24)) + '天 的人生了哦~   我是不是很棒呢~',
        '拍打喂食': {
            $title: '要来点什么呢？',
            '小饼干': '嗷呜~ 多谢款待  >ω<',
            '胡萝卜': '人家又不是小兔子 QwQ',
            '秋刀鱼': '大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～',
            '胖次': '哇~ 好可爱的胖次~~~',
            '淡定红茶': '喝完了，ˊ_>ˋ和我签订契约成为淡定少女吧！'
        },
        '传送门': {
            $title: '去逛逛 ~',
            'My博客园主页': function () {
                window.open('https://www.cnblogs.com/lianmin')
            }
        },
        '隐藏春菜': function () {
            chuncai.hide();
        }
    },
    words: [
        '咦你想做什么 oAo',
        '「不要啊」你以为我会这么说么噗噗~',
        '一起组团烧烤秋刀鱼',
        '白日依山尽，黄河入海流，欲穷千里目，更上 .. .. 一层楼?',
        '啊啦今天想吃点什么呢~',
        '据说点赞的都找到女朋友了~'
    ]
};

chuncai.init(opt);
```

## Interface

```js
/**
 * 初始化参数
 * 
 * @export
 * @interface IOpt
 */
export interface IOpt {
    /**
     * 菜单
     * 
     * @type {IMenuItem}
     * @memberof IOpt
     */
    menu: IMenuItem;
    /**
     * 随机语句
     * 
     * @type {Array<string>}
     * @memberof IOpt
     */
    words: Array<string>
}

/**
 * 菜单项
 * 
 * @export
 * @interface IMenuItem
 */
export interface IMenuItem {
    /**
     * 展开菜单时，陈述的文字
     * 
     * @type {string}
     * @memberof IMenuItem
     */
    $title?: string;

    /**
     * 点击每一项菜单时，进行的操作
     * string    - 陈述文字
     * Function  - 执行回调方法
     * ImenuItem - 子菜单
     * 
     * @type {string|Function|IMenuItem}
     * @memberof IMenuItem
     */
    [prop: string]: string | Function | IMenuItem;
}
```
