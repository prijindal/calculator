var Stack = function() {
    return {
        list:[],
        pop:function() {
            return this.list.pop()
        },
        push:function(element) {
            return this.list.push(element)
        },
        length:function() {
            return this.list.length
        },
        peek:function() {
            return this.list[this.length()-1]
        },
        isEmpty:function() {
            return this.list == false
        },
        clear:function() {
            while(!this.isEmpty()) {
                this.list.pop()
            }
        }
    }
}

module.exports = Stack
