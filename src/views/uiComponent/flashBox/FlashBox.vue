<template>
  <transition name="fade">
    <div v-show="visible" :class="flashBoxClassObject" @click="close" @mouseenter="mouseEnter" @mouseleave="mouseLeave"
         @contextmenu.prevent>
      <div class="flash-box-content-wrapper">
        <div class=".flash-box-content" v-html="content"></div>
      </div>
    </div>
  </transition>
</template>

<script>
const FLASH_BOX_COLORS = [
  {
    color: "GOLD",
    className: "flash-gold"
  },
  {
    color: "RED",
    className: "flash-red"
  },
  {
    color: "INSANE",
    className: "flash-insane"
  }
]

export default {
  name: "FlashBox",
  mounted() {
    FLASH_BOX_COLORS.forEach(item => {
      if (item.color === this.color.toUpperCase()) {
        this.flashBoxClassObject = Object.assign({}, this.flashBoxClassObject, {[item.className]: true})
      }
    })
  },
  data() {
    return {
      id: null,
      visible: true,
      color: "gold",
      content: "<h4>N</h4>othing",
      flashBoxClassObject: {
        "flash-box": true
      }
    }
  },
  methods: {
    show() {
      console.debug("FlashBox:show>>")
      this.visible = true
      console.debug("<<FlashBox:show")
    },
    close() {
      console.debug("FlashBox:close>>")
      this.visible = false
      console.debug("<<FlashBox:close")
    },
    mouseEnter() {
    },
    mouseLeave() {
    }
    //TODO 设计组件实例在DOM中销毁的时机，如果将组件实例数组传入实例会导致循环依赖
    /*    destroy() {
          console.debug("FlashBox:destroy>>")
          this.visible = false
          this.componentInstances.forEach((instance, index) => {
            if (instance.id === this.id) {
              this.componentInstances.splice(index)
              document.body.removeChild(instance.$el)
            }
          })
          console.debug("<<FlashBox:destroy")
        }*/
  }
}
</script>

<style lang="css" scoped>
.flash-box {
  position: absolute;
  right: 10%;
  top: 40%;
  width: 0.5rem;
  height: 0.5rem;
  z-index: 100;
}


.flash-gold {
  animation: flash-gold 2.5s linear 0s infinite alternate;
}

.flash-red {
  animation: flash-red 2.5s linear 0s infinite alternate;
}

.flash-insane {
  animation: flash-insane 0.5s linear 0s infinite alternate;
}

@keyframes flash-gold {
  0% {
    box-shadow: 0 0 0.05rem gold;
  }

  25% {
    box-shadow: 0 0 0.35rem gold;
  }

  50% {
    box-shadow: 0 0 0.15rem gold;
  }

  75% {
    box-shadow: 0 0 0.45rem gold;
  }

  100% {
    box-shadow: 0 0 0.05rem gold;
  }
}

@keyframes flash-red {
  0% {
    box-shadow: 0 0 0.05rem red;
  }

  25% {
    box-shadow: 0 0 0.35rem red;
  }

  50% {
    box-shadow: 0 0 0.15rem red;
  }

  75% {
    box-shadow: 0 0 0.45rem red;
  }

  100% {
    box-shadow: 0 0 0.05rem red;
  }
}

@keyframes flash-insane {
  0% {
    box-shadow: 0 0 0.05rem gold;
  }

  25% {
    box-shadow: 0 0 0.35rem red;
  }

  50% {
    box-shadow: 0 0 0.15rem pink;
  }

  75% {
    box-shadow: 0 0 0.45rem darkorchid;
  }

  100% {
    box-shadow: 0 0 0.05rem gold;
  }
}
</style>