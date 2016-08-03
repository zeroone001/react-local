var o = {
    method() {
        return 'hello';
    }
};
function getPoint() {
    var x = 1;
    var y = 2;
    return {
        x, y
    };
}
getPoint(); //{x:1,y:2}

var ms = {};
function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
}

module.exports = {
    getItem,
    setItem
};

var cart = {
    _wheels: 4,
    get wheels() {
        return this._wheels;
    },
    set wheels(value) {
        if (value < this._wheels) {
            throw new Error('数值太小了');
        }
    }
};

var obj = {
    *m(){
        yield 'hello';
    }
};








