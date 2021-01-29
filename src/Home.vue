<template>
  <div>
    <Header />
    <div class="container">
      <div style="display: flex; margin: 99px; overflow: visible;">
        <div style="min-width: 560px">
          <div class="title-text-top">
            Run a rollup
          </div>
          <transition name="slide" mode="out-in">
            <div class="title-text-bottom" v-bind:key="titleMessage">
              {{ this.titleMessage }}
            </div>
          </transition>
          <div class="title-description">
            RollupSync offers free and unlimited requests to the Ethereum network supporting the synchronization of rollup nodes.
          </div>
        </div>
        <div style="flex: 1; max-width: 500px; min-width: 100px" />
        <img class="logo-image" :src="require('../static/ellipse.svg')" width="400px" height="auto" />
      </div>
      <div class="info-title">
        Run a rollup node
      </div>
      <div class="info-description">
        Rollup Sync offers <span style="color: white">free</span> and <span style="color:white">unlimited</span> requests to the Ethereum network, supporting the synchronization of rollup nodes.
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Header from './components/Header'

@Component({
  name: 'Home',
  components: {
    Header,
  },
  metaInfo: {
    title: 'Hello World',
  },
})
export default class Home extends Vue {
  messages = [
    'block producer.',
    'validator.',
    'fraud prover.',
    'coordinator.',
  ]
  visibleIndex = 0
  titleMessage = this.messages[this.visibleIndex]
  timer = null

  mounted() {
    setTimeout(() => {
      this.updateMessage()
      this.timer = setInterval(() => {
        this.updateMessage()
      }, 6000)
    }, 4000)
  }

  updateMessage() {
    this.visibleIndex = (this.visibleIndex + 1) % this.messages.length
    this.titleMessage = this.messages[this.visibleIndex]
  }

  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.logo-image {
  position: relative;
  top: -50px;
  overflow: visible;
}
.slide-enter-active, .slide-leave-active {
  transition: all 1s;
}
.slide-enter {
  transform: translateY(-40px);
  opacity: 0%;
}
.slide-enter-to {
  transform: translateY(0px);
  opacity: 100%;
}
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0%;
}
.title-text-top {
  font-size: 64px;
  font-weight: 700;
  color: white;
}
.title-text-bottom {
  color: #EF7A3C;
  font-size: 64px;
  font-weight: 700;
}
.title-description {
  margin-top: 33px;
  color: #B0B0B0;
  font-weight: bold;
  font-size: 24px;
  max-width: 565px;
}
.info-title {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  align-self: center;
  color: #FFFFFF
}
.info-description {
  margin-top: 21px;
  font-weight: bold;
  font-size: 24px;
  line-height: 140%;
  text-align: center;
  color: #767676;
  max-width: 700px;
  align-self: center;
}
</style>
