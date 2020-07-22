<template>
  <div class="flex-wrap tabs">
    <div
      :class="['tab-item', index === activeTab ? 'active-tab' : '']"
      v-for="(item, index) in tabs"
      :key="index">
      <router-link :to="item.path">{{ item.title }}</router-link>
      <Icon type="md-close" size="14" @click="closeTab(index)" v-if="tabs.length > 1"></Icon>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "WinTab",
  data () {
    return {}
  },
  computed: mapState([
    'tabsPath',
    'tabs',
    'activeTab'
  ]),
  methods: {
    closeTab (index) {
      let path = ''
      if (index === this.tabs.length - 1) {
        path = this.tabsPath[index - 1]
      } else {
        path = this.tabsPath[index + 1]
      }
      this.$store.commit('closeWin', index)
      if (index === this.activeTab) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style scoped>
  .tabs {
    padding: 10px 16px 0 16px;
  }
  .tab-item {
    margin-right: 8px;
    background-color: #fff;
    padding: 6px 10px;
    border-radius: 6px;
    color: #515a6e;
    cursor: pointer;
  }
  .tab-item a {
    margin-right: 8px;
    color: #515a6e;
  }
  .tab-item.active-tab a {
    color: #fff;
  }
  .tab-item.active-tab {
    background-color: #2d8cf0;
    color: #fff;
  }
</style>
