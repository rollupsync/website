<template>
  <div>
    <Header />
    <div>
      Home page
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
export default class Home extends Vue {}
</script>

<style scoped>
</style>
