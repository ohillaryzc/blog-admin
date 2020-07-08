<template>
  <div class="sidebar" :class="{'collapsed-sidebar': isCollapsed}">
    <div class="logo-box">{{ isCollapsed ? 'admin' : 'blog-admin' }}</div>
    <Menu theme="dark" accordion width="auto" :class="{'collapsed-menu': isCollapsed}">
      <Submenu name="1">
        <template slot="title" v-if="isCollapsed">
          <Poptip trigger="hover" placement="right" popper-class="collapsed-popper" padding="8px 0">
            <div class="collapsed-icon flex-wrap flex-x-center flex-y-center"><Icon type="ios-paper"/></div>
            <ul slot="content" class="menu-items">
              <li>文章管理</li>
              <li>文章管理</li>
            </ul>
          </Poptip>
        </template>
        <template slot="title" v-else>
          <Icon type="ios-paper"/>
          <span class="menu-title">内容管理</span>
        </template>
        <MenuItem name="1-1">文章管理</MenuItem>
        <MenuItem name="1-2">标签管理</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title" v-if="isCollapsed">
          <Poptip trigger="hover" placement="right" popper-class="collapsed-popper" padding="8px 0">
            <div class="collapsed-icon flex-wrap flex-x-center flex-y-center"><Icon type="ios-paper"/></div>
            <ul slot="content" class="menu-items">
              <li>文章管理</li>
              <li>文章管理</li>
            </ul>
          </Poptip>
        </template>
        <template slot="title" v-else>
          <Icon type="ios-paper"/>
          <span class="menu-title">内容管理</span>
        </template>
        <MenuItem name="2-1">文章管理</MenuItem>
        <MenuItem name="2-2">标签管理</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Sidebar",
  data () {
    return {
    }
  },
  computed: mapState([
    'isCollapsed'
  ]),
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 240px;
    background-color: #191a23;
    box-shadow: 0 0 10px 8px rgba(0,0,0,.2);
    z-index: 99;
    transition: width .3s ease-in-out;
  }
  .sidebar.collapsed-sidebar {
    width: 78px;
  }
  .logo-box {
    height: 60px;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
    background-color: #191a23;
    color: #ffffff;
  }
  .menu-title {
    display: inline-block;
    white-space: nowrap;
    transition: width .3s ease-in-out;
  }
  .collapsed-icon {
    width: 78px;
    height: 60px;
  }
  .menu-items li {
    line-height: 28px;
    color: rgba(255,255,255,.7);
    padding: 0 8px;
  }
  .menu-items li:hover {
    color: #fff;
  }
</style>
