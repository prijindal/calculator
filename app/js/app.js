angular.module('calculator', [])
.controller('mainController',
['$scope','ipc', 'expression',
function($scope,ipc, express) {
    var self = this;
    var expression = express.exp

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
    var toggle = 1;
    self.eval = function() {
        var input1 = angular.element('#result2')
        var input2 = angular.element('#result1')
        if (toggle) {
            input1 = angular.element('#result1')
            input2 = angular.element('#result2')
        }
        toggle = !toggle
        var time = 500
        var height = input1.css('height')

        var evaluated = eval(expression.list.join(''))
        input1.slideUp(time, function() {
            expression.clear()
        })
        input2.css('height', 0)
        input2.css('margin-top',height)
        input2.css('display','inline-flex')
        input2.css('font-size','0')
        input2.children('input').after('<span class="sample">'+evaluated+'</span>')
        input2.animate({
            height:height,
            'margin-top':0
        }, time, function(){
            input2.css('font-size','20px')
            expression.push(evaluated)
            input2.children('.sample').remove()
            $scope.$digest()
        })
    }
    self.clear = function() {
        expression.clear()
    }

    angular.element('body').on('keyup', function(e) {
        var key = e.keyCode
        if (key>=48&&key<=57) {
            self.add(key-48)
            $scope.$digest()
        }
    })

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
