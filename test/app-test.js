var runner = require('ruff-app-runner');
var verify = require('ruff-mock').verify;

exports['test should all turn on wihle application is ready'] = function(){
    runner.run('/Users/huchunbo/Development/Ruff/hello-ruff', function(){
        verify($('#led-r')).turnOn();
    });
};

require('test').run(exports);
