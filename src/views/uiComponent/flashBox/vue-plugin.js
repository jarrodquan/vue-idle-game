import FlashBox from "./index";

FlashBox.install = (Vue, installOptions) => {
    console.debug("FlashBox::install>>")
    Vue.prototype.$flashBox = (options) => new FlashBox(options)
    console.debug("<<FlashBox::install")
}

export default FlashBox