<template>
  <div class="button-container" v-on:click="handleClick">
    <div class="button-text">
      <div v-if="!loading">
        <slot></slot>
      </div>
      <div v-if="loading">
        {{ this.loadingText || 'Loading...' }}
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Button',
  components: {},
  props: ['onClick', 'loadingText'],
})
export default class Button extends Vue {
  loading = false
  async handleClick() {
    if (!this.onClick) return
    this.loading = true
    try {
      await this.onClick()
    } catch (err) {
      // uncaught error
      console.log(err)
      console.log('Error in button handler')
    } finally {
      this.loading = false
    }
  }
}
</script>
<style scoped>
.button-container {
  cursor: pointer;
  user-select: none;
  margin-top: 8px;
  align-self: center;
  background: #B8FAF5;
  border-radius: 4px;
  width: 220px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-text {
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  font-family: 'Inter';
  color: black;
  margin: 14px;
}
</style>
