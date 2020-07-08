<template>
  <div>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <div class="router-content" :class="{'collapsed-content': isCollapsed}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
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
    Navbar
  }
}
</script>

<style scoped>
  .router-content {
    height: calc(100vh - 60px);
    padding: 60px 0 0 240px;
    transition: padding .3s ease-in-out;
  }
  .router-content.collapsed-content {
    padding-left: 78px;
  }
</style>
