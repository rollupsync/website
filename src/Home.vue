<template>
  <div>
    <Header />
    <div class="container">
      <div style="display: flex; margin: 99px; margin-top: 200px; margin-bottom: 200px; overflow: visible;">
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
        <div style="flex: 1; max-width: 300px; min-width: 100px" />
        <!-- <div ref="animation" class="animation" style="min-width: 300px; max-width: 330px" /> -->
        <img class="logo-image" :src="require('../static/i1.svg')" width="500px" height="auto" />
      </div>
      <div class="info-title">
        Free and unlimited requests
      </div>
      <div class="info-description">
        Use the snippets below to run your own rollup node. Docker and NodeJS are required to run most nodes.
      </div>
      <SnippetTabs :tabs="codeTabs" />
      <div class="horizontal-detail-container">
        <div class="detail">
          <div class="title-text-top">
            How does it work?
          </div>
          <div class="title-description">
            RollupSync whitelists contract addresses; requests about rollup addresses succeed. Requests about other addresses fail.
          </div>
        </div>
        <div class="requests-info-container">
          <div class="requests-info-text">
            <div style="color: #FF4242">{{ this.requestCount }}</div>
            <div>requests in the last 24 hours.</div>
          </div>
        </div>
      </div>
      <div style="max-width: 810px; margin-top: 184px; align-self: center">
        <div class="title-text-top" style="text-align: center">
          What is it?
        </div>
        <div class="title-description" style="max-width: 810px; text-align: center">
          RollupSync is a small server that sits between a rollup node and an Ethereum node operated by us.
        </div>
      </div>
      <img
        src="../static/i2.svg"
        style="max-width: 1020px; align-self: center; margin-top: 100px; margin-bottom: 100px"
      />
      <div class="horizontal-detail-container">
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
        <img src="../static/i3.svg" />
      </div>
      <div class="horizontal-detail-container">
        <div style="margin: 99px; min-width: 400px; text-align: center">
          <img src="../static/i4.svg" />
        </div>
        <div class="detail">
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
      <div style="height: 200px" />
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
// import lottie from 'lottie-web'
import RollupAnimation from '../static/rollup_1.json'
import FuelLogo from '../static/fuel-logo.svg'
import ArbitrumLogo from '../static/arbitrum-logo.png'
import Logo from '../static/logo.svg'
import LinkIcon from '../static/link-icon.svg'

@Component({
  name: 'Home',
  components: {
    Header,
    Footer,
    SnippetTabs,
  },
  metaInfo: {
    title: 'RollupSync',
    link: [
      {
        rel: 'icon',
        href: Logo,
        type: 'image/svg+xml',
      }
    ]
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
  requestCount = '0'

  codeTabs = [
    {
      image: LinkIcon,
      link: 'https://github.com/rollupsync/server/blob/main/src/config.js#L18',
    },
    {
      image: FuelLogo,
      title: 'Run a Fuel node!',
      command: 'sh -c "$(curl -s https://raw.githubusercontent.com/rollupsync/launch-scripts/main/fuel.sh)"',
      link: 'https://github.com/rollupsync/launch-scripts/blob/main/fuel.sh',
    },
    // {
    //   image: ArbitrumLogo,
    //   title: 'Run an Arbitrum node!',
    //   command: 'sh -c "$(curl -s https://raw.githubusercontent.com/rollupsync/launch-scripts/main/arbitrum.sh)"',
    //   link: 'https://github.com/rollupsync/launch-scripts/blob/main/arbitrum.sh',
    // }
  ]

  mounted() {
    this.updateRequestCount()
    setTimeout(() => {
      this.updateMessage()
      this.timer = setInterval(() => {
        this.updateMessage()
        this.updateRequestCount()
      }, 6000)
    }, 4000)
    // lottie.loadAnimation({
    //   container: this.$refs.animation, // the dom element
    //   renderer: 'svg',
    //   loop: true,
    //   autoplay: true,
    //   animationData: RollupAnimation, // the animation data
    // })
  }

  updateMessage() {
    this.visibleIndex = (this.visibleIndex + 1) % this.messages.length
    this.titleMessage = this.messages[this.visibleIndex]
  }

  async updateRequestCount() {
    const res = await fetch('https://mainnet.rollupsync.com/request-count')
    const data = await res.json()
    if (data.count < 1000) {
      this.requestCount = data.count
    } else if (data.count >= 1000 && data.count < 1000000) {
      const count = data.count.toString()
      this.requestCount = `${count.slice(0, -3)},${count.slice(-3)}`
    } else if (data.count >= 1000000) {
      const count = (data.count/1000000).toFixed(1)
      this.requestCount = `${count.replace('.0', '')}M`
    }
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
  top: -80px;
  overflow: visible;
  min-height: 487px;
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
  color: #FF4242;
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
  color: #FF4242;
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
.horizontal-detail-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 220px;
}
.requests-info-container {
  background-color: #222222;
  border-radius: 88px;
  display: flex;
  flex-direction: column;
  max-width: 620px;
}
.requests-info-text {
  margin-left: 46px;
  margin-right: 46px;
  margin-top: 79px;
  margin-bottom: 79px;
  font-size: 64px;
  color: white;
  font-weight: bold;
  line-height: 130%;
}
</style>
