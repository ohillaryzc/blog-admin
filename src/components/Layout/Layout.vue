<template>
  <div>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <div class="router-content" :class="{'collapsed-content': isCollapsed}">
      <win-tab></win-tab>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" ref="page"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import WinTab from './WinTab'
export default {
  name: "Layout",
  data () {
    return {}
  },
  methods: {
  },
  computed: mapState([
    'isCollapsed'
  ]),
  components: {
    Sidebar,
    Navbar,
    WinTab
  }
}
</script>

<style scoped>
  .router-content {
    min-height: 100vh;
    padding: 60px 0 0 240px;
    transition: padding .3s ease-in-out;
    border: 1px solid #f7f7f7;
    background-color: #f7f7f7;
  }
  .router-content.collapsed-content {
    padding-left: 78px;
  }
</style>
