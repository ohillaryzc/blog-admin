<template>
  <div class="nav-bar" :class="{'collapsed-nav-bar': isCollapsed}">
    <div class="top-item left-util hover" @click="collapsedSide">
      <Icon type="md-reorder" size="24" class="collapsed-icon"/>
    </div>
    <div class="top-item left-util">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <template v-for="(item, index) in titles">
          <BreadcrumbItem :key="index" v-if="item">{{ item }}</BreadcrumbItem>
        </template>
      </Breadcrumb>
    </div>
    <div class="top-item right-util">
      <Poptip placement="bottom" width="150" trigger="hover" v-model="showUserMenu">
        <div class="user-box">
          <Avatar icon="ios-person"/>
          <span>{{ user.name }}</span>
        </div>
        <div slot="content" @click="showUserMenu = false">
          菜单
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Navbar",
  data () {
    return {
      showUserMenu: false
    }
  },
  computed: mapState([
    'isCollapsed',
    'titles',
    'user'
  ]),
  methods: {
    collapsedSide () {
      this.$store.commit('setCollapsed')
    }
  }
}
</script>

<style scoped>
  .nav-bar {
    position: fixed;
    top: 0;
    left: 240px;
    right: 0;
    height: 60px;
    padding: 0 16px;
    background-color: #fff;
    box-shadow: 0 0 8px 6px rgba(0,0,0,.2);
    z-index: 98;
    transition: left .3s ease-in-out;
  }
  .nav-bar.collapsed-nav-bar {
    left: 78px;
  }
  .collapsed-nav-bar .collapsed-icon {
    transform: rotate(-90deg);
  }
  .collapsed-icon {
    transition: all .3s ease-in-out;
  }
  .top-item {
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 60px;
    padding: 0 6px;
    cursor: pointer;
  }
  .top-item.hover:hover {
    background-color: #f8f8f9;
  }
  .top-item.left-util {
    float: left;
  }
  .top-item.right-util {
    float: right;
  }
</style>
