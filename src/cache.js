var lcd = require('./lcd');

var cache = {
    _temperature: 0,
    _humidity: 0,
    _illuminance: 0,
    _pushButton: false,
    updateLCD: function() {
        if (!this._pushButton) {
            var date = new Date((new Date()).getTime() + 8*60*60*1000);
            var hour = date.getHours();
            hour = hour > 9 ? hour : '0'+hour;
            var minute = date.getMinutes()
            minute = minute > 9 ? minute : '0'+minute;

            lcd.device.setCursor(0, 0);
            lcd.device.print(this._temperature + 'C|Humidity:' + this._humidity + '%');

            lcd.device.setCursor(0, 1);
            var secondLineContent = 'light:' + this._illuminance + ' | ' + hour + ':' + minute;
            lcd.device.print(secondLineContent);
        } else {
            lcd.device.setCursor(0, 0);
            lcd.device.print('Hey, you pushed button.');
        }

    },
    set temperature (value) {
        this._temperature = value;
        this.updateLCD();
    },
    get temperature () {
        return this._temperature;
    },
    set humidity (value) {
        this._humidity = value;
        this.updateLCD();
    },
    get humidity () {
        return this._humidity;
    },
    set illuminance (value) {
        this._illuminance = value;
        this.updateLCD();
    },
    get illuminance () {
        return this._illuminance;
    },
    set pushButton (value) {
        lcd.clear();
        this._pushButton = value;
        this.updateLCD();
    },
    get pushButton () {
        return this._pushButton;
    }
};

module.exports = cache;
