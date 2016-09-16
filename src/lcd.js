var lcd = {
    init: function() {
        this.device.turnOn();
    },
    get device () {
        return $('#lcd');
    },
    turnOn : function () {
        this.device.turnOn();
    },
    turnOff: function () {
        this.device.turnOff();
    },
    setContent: function (content) {
        this.device.turnOn();
        this.clear();
        this.device.setCursor(0, 0);
        this.device.print(content);
    },
    clear: function () {
        this.device.clear();
    }
};

module.exports = lcd;
