<template>
  <div class="footer-container">
    <img
      class="github"
      src="../../static/github-white.png"
      v-on:click="githubLink"
    />
    <Button :onClick="supportLink">
      Contact Support
    </Button>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Button from './Button'

@Component({
  name: 'Footer',
  components: { Button },
})
export default class Footer extends Vue {
  githubLink() {
    window.open('https://github.com/rollupsync', '_blank')
  }
  supportLink() {
    window.open('https://github.com/rollupsync/server/issues', '_blank')
  }
}
</script>
<style scoped>
.footer-container {
  width: 100%;
  background: #222222;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100px;
}
.github {
  margin: 25px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  user-select: none;
}
</style>
