function Robot(n, a, b) {
    "use strict";
    return {
        num: n,
        att: a,
        blood: b,

        hurt: function (h) {
            this.blood = this.blood - h;
        },
        attack: function (r) {
            var h = Math.ceil(Math.random() * this.att);
            r.hurt(h);
            document.writeln("机器人" + this.num + "攻击了机器人" + r.num + "。机器人" + r.num + "受到了" + h + "点伤害。\n");
        },
        backattack: function (r) {
            if (Math.round(Math.random()) === 0) {
                this.attack(r);
                return true;
            }
            return false;
        }
    };
}
