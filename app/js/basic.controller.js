angular.module('calculator')

.controller('basicController',
['$rootScope', 'expression','add',
function($rootScope, express, add) {
    $rootScope.page = 'basic'
    var self = this;
    var expression = express.exp
    expression.clear()

    $rootScope.expression = expression.list
    self.add = add.add(expression)

    self.clear = function() {
        expression.clear()
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
            $rootScope.$digest()
        })
    }

    angular.element('body').on('keyup', function(e) {
        var key = e.keyCode
        if (key>=48&&key<=57) {
            self.add(key-48)
        }
    })

}])
