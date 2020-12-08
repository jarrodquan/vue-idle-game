import Vue from 'vue'
import FlashBoxComponent from "./FlashBox";

let idIncrementer = 0
let componentInstances = []
let FlashBoxComponentSubclass = Vue.extend(FlashBoxComponent)

let FlashBox = options => {
    let id = ++idIncrementer
    let rootElement = document.createElement("div")
    rootElement.className = ".flash-box-" + id
    let tempObject = {id: id}
    let finalOptions = Object.assign({}, options, tempObject)
    console.debug("FlashBox:finalOptions => " + JSON.stringify(finalOptions))
    let componentInstance = new FlashBoxComponentSubclass({
        el: rootElement,
        data: finalOptions,
        methods: {
            mouseEnter: finalOptions.onMouseEnter || function () {
            },
            mouseLeave: finalOptions.onMouseLeave || function () {
            }
        }
    })

    componentInstances.push(componentInstance)
    document.body.appendChild(componentInstance.$el)
    return componentInstance
}

FlashBox.show = id => {
    console.debug("FlashBox::show>>")
    let index = findInstanceIndexById(id)
    if (index !== -1) componentInstances[index].show()
    console.debug("<<FlashBox::close")
}

FlashBox.close = id => {
    console.debug("FlashBox::close>>")
    let index = findInstanceIndexById(id)
    if (index !== -1) componentInstances[index].close()
    console.debug("<<FlashBox::close")
}

FlashBox.destroy = id => {
    console.debug("FlashBox::destroy>>")
    let index = findInstanceIndexById(id)
    if (index !== -1) {
        let instance = componentInstances.splice(index)
        document.body.removeChild(instance.$el)
    }
    console.debug("<<FlashBox::destroy")
}

FlashBox.clear = () => {
    console.debug("FlashBox::clear>>")
    idIncrementer = 0
    componentInstances.forEach(it => document.body.removeChild(it.$el))
    componentInstances.length = 0
    console.debug("<<FlashBox::clear")
}

function findInstanceIndexById(id) {
    if (id === null || id === "") {
        throw "ID is not valid"
    }

    for (let index = 0; index < componentInstances.length; index++) {
        let instance = componentInstances[index]
        if (instance.id === id) {
            return index
        }
    }

    return -1
}

export default FlashBox