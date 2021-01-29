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
        <div ref="animation" class="animation" style="min-width: 300px; max-width: 330px" />
        <!-- <img class="logo-image" :src="require('../static/ellipse.svg')" width="400px" height="auto" /> -->
      </div>
      <div class="info-title">
        Free and unlimited requests
      </div>
      <div class="info-description">
        Use the snippets below to run your own rollup node. Docker and NodeJS are required to run most nodes.
      </div>
      <SnippetTabs :tabs="[
        { image: 'https://docs.fuel.sh/logo.4b97a9a3.svg' },
        { image: 'https://docs.fuel.sh/logo.4b97a9a3.svg' },
      ]" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Header from './components/Header'
import SnippetTabs from './components/SnippetTabs'
import lottie from 'lottie-web'
import RollupAnimation from '../static/rollup_1.json'

@Component({
  name: 'Home',
  components: {
    Header,
    SnippetTabs,
  },
  metaInfo: {
    title: 'RollupSync',
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
    lottie.loadAnimation({
      container: this.$refs.animation, // the dom element
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: RollupAnimation, // the animation data
    })
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
  max-width: 1400px;
  margin: auto;
}
.animation {
  position: relative;
  top: -40px;
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
  font-weight: bold;
  font-size: 48px;
  line-height: 140%;
  color: #EF7A3C;
  align-self: center;
}
.info-description {
  margin-top: 21px;
  margin-bottom: 72px;
  font-weight: bold;
  font-size: 24px;
  line-height: 140%;
  text-align: center;
  color: #767676;
  max-width: 700px;
  align-self: center;
}
</style>
