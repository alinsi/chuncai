import chuncai from './chuncai';

var opt = {
    $title: '你想做什么呢？',
    '显示公告': function () {

    },
    '存活时间': function () {

    },
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
};

chuncai.init(opt);