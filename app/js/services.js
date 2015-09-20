angular.module('calculator')

.service('ipc',[ function() {
    var ipc = require('ipc')

    var closeWindow = function() {
        ipc.send('closeWindow')
    }

    return {
        closeWindow:closeWindow
    }
}])
.service('expression',[ function() {
    var stack = require('../logic/stack')()

    return {
        exp:stack
    }
}])
.service('add', ['isDigit', function(isDigit) {
    var add = function(expression)  {
        return function(char) {
            if (isDigit.check(char)) {
                if (isDigit.check(expression.peek())) {
                    expression.push(expression.pop() + char.toString())
                }
                else {
                    expression.push(char)
                }
            }
            else {
                expression.push(char.toString())
            }
        }
    }

    return {
        add:add
    }
}])

.service('isDigit', function() {

    var isDigit = function(data) {
        return data === parseInt(data, 10)
    }

    return {
        check:isDigit
    }
})
