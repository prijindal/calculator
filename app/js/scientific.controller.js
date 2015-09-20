angular.module('calculator')

.controller('scientificController',
['$rootScope', 'expression','add',
function($rootScope, express, add) {
    $rootScope.page = 'scientific'
    var self = this;
    var expression = express.exp
    expression.clear()

    $rootScope.expression = expression.list
    self.add = add.add(expression)

    self.clear = function() {
        expression.clear()
    }
}])
