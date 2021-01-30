<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import '../static/inter-font.css'

@Component({
  name: 'App',
})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0px;
  font-family: 'Inter', helvetica, sans-serif;
  font-display: swap;
  background-color: black;
}
</style>
