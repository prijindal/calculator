angular.module('calculator', [])
.controller('mainController',
['ipc', 'expression',
function(ipc, expression) {
    var self = this;
    var expression = expression.exp

    self.close = ipc.closeWindow
    self.expression = expression.list
    self.add = function(char) {
        if (isDigit(char)) {
            if (expression.peek() === parseInt(expression.peek())) {
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
    self.eval = function() {
        var evaluated = eval(expression.list.join(''))
        expression.clear()
        expression.push(evaluated)
    }
    self.clear = expression.clear

    var isDigit = function(data) {
        return data === parseInt(data, 10)
    }
}])
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
