<template>
  <div class="header">
    <img
      src="../../static/logo.svg"
      height="43px"
      style="margin-left: 99px; margin-right: 10px"
    />
    <div class="header-text">RollupSync</div>
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
  height: 122px;
  display: flex;
  align-items: center;
  margin: auto;
  max-width: 1400px;
}
.header-text {
  color: #E6EFF0;
  font-size: 46px;
  font-weight: 700;
  margin: 8px;
}
</style>
