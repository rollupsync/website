<template>
  <div class="container">
    <div class="tabs">
      <div
        class="tab"
        v-for="(tab, index) of tabs"
        :style="{
          ...(index === activeIndex ? {
            borderBottom: '2px solid #FF4242',
          } : {}),
          ...(index > 0 ? { marginLeft: '4px' } : {}),
          ...(index < tabs.length-1 ? { marginRight: '4px' } : {}),
        }"
        v-on:click="activeIndex = index"
      >
        <img
          :src="tab.image"
          width="44px"
          height="auto"
          :class="activeIndex === index ? 'tab-image-active' : 'tab-image-inactive'"
        />
      </div>
    </div>
    <div class="snippet-container">
      <div class="snippet-title">
        Run a rollup node!
      </div>
      <div class="code-container">
        <div style="display: flex">
          <div style="user-select: none">$ </div>
          <div style="width: 10px" spacer />
          <div>{{ tabs[activeIndex].command }}</div>
        </div>
        <div style="height: 30px" spacer />
        <Button>
          Copy
        </Button>
      </div>
      <div v-on:click="() => viewCode(tabs[activeIndex].link)" class="view-code-button">
        view code →
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Button from './Button'

@Component({
  name: 'SnippetTabs',
  components: { Button },
  props: ['tabs'],
})
export default class SnippetTabs extends Vue {
  activeIndex = 0

  viewCode(link) {
    window.open(link, '_blank')
  }
}
</script>
<style scoped>
.container {
  align-self: center;
}
.tabs {
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.tab {
  padding: 8px;
  border-bottom: 2px solid #aaaaaa;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.tab-image-inactive {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter:    grayscale(100%);
  -ms-filter:     grayscale(100%);
  -o-filter:      grayscale(100%);
}
.tab-image-active {}
.snippet-container {
  min-width: 700px;
  max-width: 900px;
  background-color: rgba(227, 238, 251, 0.3);
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.snippet-title {
  font-weight: 600;
  font-size: 24px;
  color: #222222;
  align-self: center;
  margin: 12px;
}
.code-container {
  margin-left: 22px;
  margin-right: 22px;
  padding: 22px;
  background: #37393A;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-family: 'Menlo', 'PT Mono';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 140%;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
}
.copy-button {
  cursor: pointer;
  user-select: none;
  margin-top: 38px;
  align-self: center;
  background: #B8FAF5;
  border-radius: 4px;
  width: 220px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.copy-button-text {
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  font-family: 'Inter';
  color: black;
  margin: 14px;
}
.view-code-button {
  align-self: flex-end;
  margin: 23px;
  cursor: pointer;
  user-select: none;
  color: white;
  text-decoration: underline;
}

</style>
