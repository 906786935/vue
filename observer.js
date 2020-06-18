let data = {
    name: "徐将",
    age: 18,
    arr: [1, 2, 3, 4, 5],
    obj: {
        name: '徐梦',
        age: 24
    }
}
let nextPro = Array.prototype;
let perPro = Object.create(nextPro);//克隆
//重写原型上的方法
['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'].forEach(method => {
    perPro[method] = function(){
        nextPro[method].call(this,...arguments);//先执行一遍之前保留的原型方法
        render()    
    }
})
function defineProperty(data, key, value) {
    Object.defineProperty(data, key, {
        get() {
            console.log('读')
            return value
        },
        set(setValue) {
            console.log('写')
            if (value === setValue) {
                return
            }
            value = setValue
            raner()
        }
    })
    observer(value)

}
function observer(data) {
    if (Array.isArray(data)) {
        data.__proto__ = perPro;//如果是数组，就使用改变后的原型方法
        return
    }
    if (typeof data === 'object') {
        for (let key in data) {
            defineProperty(data, key, data[key])
        }
    }

}
function render() {
    console.log('页面渲染了')
}
function $set(data,key,value){
    if(Array.isArray(data)){
        data.splice(key,1,value)
        return;
    }
    defineProperty(data,key,value)
    render()
}
function $delete(data,key){
    if(Array.isArray(data)){
        data.splice(key,1)
        return;
    }
    delete data[key]
    render()
}
observer(data)