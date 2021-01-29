<template>
  <div class="header">
    <div class="header-text">Rollup Sync</div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Header',
})
export default class Header extends Vue {}
</script>
<style scoped>
.header {
  background-color: black;
  padding: 8px;
}
.header-text {
  color: white;
  font-family: 'Inter';
}
</style>
