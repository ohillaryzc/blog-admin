<template>
  <div class="sidebar" :class="{'collapsed-sidebar': isCollapsed}">
    <div class="logo-box">{{ isCollapsed ? 'admin' : 'blog-admin' }}</div>
    <Menu theme="dark" accordion :active-name="$route.path" width="auto" :class="{'collapsed-menu': isCollapsed}">
      <Submenu v-for="(item, index) in menus" :key="index" :name="item.path">
        <template slot="title" v-if="isCollapsed">
          <Poptip trigger="hover" placement="right" popper-class="collapsed-popper" padding="8px 0">
            <div class="collapsed-icon flex-wrap flex-x-center flex-y-center"><Icon :type="item.meta.icon"/></div>
            <ul slot="content" class="menu-items">
              <li v-for="(menu, i) in item.children" :key="i" :class="{'active': $route.path === `${item.path}/${menu.path}`}"><router-link :to="`${item.path}/${menu.path}`">{{ menu.meta.title }}</router-link></li>
            </ul>
          </Poptip>
        </template>
        <template slot="title" v-else>
          <Icon :type="item.meta.icon"/>
          <span class="menu-title">{{ item.meta.title }}</span>
        </template>
        <MenuItem v-for="(menu, i) in item.children" :key="i" :name="`${item.path}/${menu.path}`" :to="`${item.path}/${menu.path}`">{{ menu.meta.title }}</MenuItem>
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
    'isCollapsed',
    'menus'
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
    line-height: 30px;
    padding: 0 8px;
  }
  .menu-items li a {
    color: rgba(255,255,255,.7);
  }
  .menu-items li:hover a {
    color: #fff;
  }
  .menu-items li.active {
    background-color: #2d8cf0;
  }
  .menu-items li.active a {
    color: #fff;
  }
</style>
