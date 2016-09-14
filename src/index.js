'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    // 在 `#button` 按下时点亮 `#led-r`.
    $('#button').on('push', function() {
        console.log('Button pushed.');
        $('#led-r').turnOn();
    });

    // 在 `#button` 释放时熄灭 `#led-r`.
    $('#button').on('release', function() {
        console.log('Button released.');
        $('#led-r').turnOff();
    });
});

$.end(function () {
    $('#led-r').turnOff();
});
