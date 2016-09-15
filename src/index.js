//附上在线地址可以全部复制下来，  http://www.shenqiuyuantu.com/h1/src/index.js
'use strict';
/*
说明:
192.168.0.10 换成自己板子的局域网地址，端口3000
参数 show 表示显示的灯泡， 字段 r,g,b 可以选择用
参数 hide 表示 关闭的灯泡， 字段 r,g,b 可以选择用
比如这个 是 打开 led-r和led-b灯泡 关闭，led-g灯泡
http://192.168.0.10:3000/index.html?show=r,b&hide=g

*/

var lcd = {
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

var cache = {
    _temperature: 0,
    _humidity: 0,
    updateLCD: function() {
        lcd.device.setCursor(0, 0);
        lcd.device.print(this._temperature + 'C|Humidity:' + this._humidity + '%');
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
    }
};

$.ready(function (error) {

    if (error) {
        console.log(error);
        return;
    }

    // setup lcd
    lcd.turnOn();
    $('#led-r').turnOn();

    // 在 `#button` 按下时点亮 `#led-r`.
    $('#button').on('push', function() {
        console.log('Button pushed.');
        $('#led-r').turnOn();

        lcd.setContent('Wang wang wang!');
    });

    // 在 `#button` 释放时熄灭 `#led-r`.
    $('#button').on('release', function() {
        console.log('Button released.');
        $('#led-r').turnOff();

        lcd.clear();
    });

    setInterval(
        function () {
            var humirature = $('#humirature');
            humirature.getTemperature(function (error, temperature) {
                if (error) {
                    console.error(error);
                    return;
                }
                cache.temperature = temperature;
            });

            humirature.getRelativeHumidity(function (error, humidity) {
                if (error) {
                    console.error(error);
                    return;
                }
                cache.humidity = humidity;
            });
        }, 1000);

    //run();
});

var light={
    "r":"led-r",
    "g":"led-g",
    "b":"led-b",
    "on":function(key){
        if(!this[key]){
            return this;
        }
        $('#'+this[key]).turnOn();
        return this;
    },
    "off":function(key){
        if(!this[key]){
            return this;
        }
        $('#'+this[key]).turnOff();
        return this;
    }
}
var runTime=null;
function run(){
    runTime=setTimeout(function(){
        run();
    },1000/10);
    var isR=Math.random()>0.5?"on":"off";
    var isG=Math.random()>0.5?"on":"off";
    var isb=Math.random()>0.5?"on":"off";
    light[isR]("r")[isG]("g")[isb]("b");
}

$.end(function () {
    clearTimeout(runTime);
    light.off("r").off("g").off("b");
});


var PORT = 3000;

var http = require('http');
var url=require('url');
var queryString  = require("querystring");

var datas={};
var server = http.createServer(function (request, response) {
    var query=url.parse(request.url).query;
    datas = queryString.parse(query);
    response.writeHead(404, {
        'Content-Type': 'text/html'
    });
    var showText='\
        <html>\
        <head>\
            <meta charset="utf-8">\
            <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">\
        </head>\
        <body>\
            <p>URL: ' + JSON.stringify(datas) + '</p>\
            <p>temperature: ' + cache.temperature + '</p>\
            <p>humidity: ' + cache.humidity + '</p>\
        </body>\
        </html>\
     ';
    response.write(showText);
    response.end();
    if(datas.show!=undefined){
        var str=datas.show.split(",");
        for(var i=0;i<str.length;i++){
            light.on(str[i]);
        }
    }
    if(datas.hide!=undefined){
        var str=datas.hide.split(",");
        for(var i=0;i<str.length;i++){
            light.off(str[i]);
        }
    }
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
