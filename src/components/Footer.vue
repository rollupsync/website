<template>
  <div class="footer-container">
    <img
      class="github"
      src="../../static/github-white.png"
      v-on:click="githubLink"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Footer',
  components: {},
})
export default class Footer extends Vue {
  githubLink() {
    window.open('https://github.com/rollupsync', '_blank')
  }
}
</script>
<style scoped>
.footer-container {
  width: 100%;
  background: #222222;
  display: flex;
  align-items: center;
  justify-content: center;
}
.github {
  margin: 25px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  user-select: none;
}
</style>
