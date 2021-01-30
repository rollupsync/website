<template>
  <div>
    <Header />
    <div class="container">
      <div style="display: flex; margin: 99px; overflow: hidden;">
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
      <SnippetTabs :tabs="codeTabs" />
      <div style="height: 60px;" spacer />
      <div class="detail">
        <div class="title-text-top">
          How does it work?
        </div>
        <div class="title-description">
          RollupSync whitelists contract addresses; requests about rollup addresses succeed. Requests about other addresses fail.
        </div>
      </div>
    </div>
    <div class="requests-info-container">
      <div class="requests-info-text">
        <span style="color: #EF7A3C">500,000</span> requests in the last 24 hours.
      </div>
    </div>
    <div class="container">
      <div class="detail" style="align-self: center">
        <div class="title-text-top" style="text-align: center">
          What is it?
        </div>
        <div class="title-description" style="text-align: center">
          RollupSync is a small server that sits between a rollup node and an Ethereum node operated by us.
        </div>
      </div>
      <div class="detail">
        <div class="title-text-top">
          Free
        </div>
        <div class="title-description">
          Unlimited reads to rollup addresses.
          <div style="height: 24px" spacer />
          Unlimited transactions anywhere.
        </div>
      </div>
      <div class="detail" style="align-self: flex-end">
        <div class="title-text-top">
          Fast
        </div>
        <div class="title-description">
          Cached data improves sync speed.
          <div style="height: 24px" spacer />
          CDN moves data closer to you.
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Header from './components/Header'
import Footer from './components/Footer'
import SnippetTabs from './components/SnippetTabs'
import lottie from 'lottie-web'
import RollupAnimation from '../static/rollup_1.json'

@Component({
  name: 'Home',
  components: {
    Header,
    Footer,
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

  codeTabs = [
    {
      image: 'https://docs.fuel.sh/logo.4b97a9a3.svg',
      command: 'sh -c "curl https://raw.githubusercontent.com/rollupsync/launch-scripts/main/fuel.sh"',
      link: 'https://github.com/rollupsync/launch-scripts/blob/main/fuel.sh',
    },
    {
      image: 'https://docs.fuel.sh/logo.4b97a9a3.svg',
      command: 'sh -c "curl https://raw.githubusercontent.com/rollupsync/launch-scripts/main/fuel.sh"',
      link: 'https://github.com/rollupsync/launch-scripts/blob/main/fuel.sh',
    }
  ]

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
.detail {
  max-width: 530px;
  margin: 99px;
}
.requests-info-container {
  width: 100%;
  background-color: #222222;
  display: flex;
  align-items: center;
  justify-content: center;
}
.requests-info-text {
  margin: 40px;
  font-size: 64px;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
