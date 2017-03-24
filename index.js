"use strict";
const BusForm_1 = require("./lib/BusForm");
function busform(opts) {
    let instance;
    if (typeof opts === 'string') {
        instance = new BusForm_1.BusForm(opts);
    }
    return instance.middleWare;
}
module.exports = busform;
//# sourceMappingURL=index.js.map