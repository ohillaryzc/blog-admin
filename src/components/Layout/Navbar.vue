<template>
  <div class="nav-bar" :class="{'collapsed-nav-bar': isCollapsed}">
    <div class="top-item left-util hover" @click="collapsedSide">
      <Icon type="md-reorder" size="24" class="collapsed-icon"/>
    </div>
    <div class="top-item left-util">
      <Icon type="md-refresh" size="22" @click="update" :class="{'spin-loading': requestLoading}"/>
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
          <span class="username">{{ user.name }}</span>
        </div>
        <div slot="content" @click="showUserMenu = false">
          <div class="down-menu-item">个人中心</div>
          <div class="down-menu-item">设置</div>
          <div class="down-menu-item" @click="toLogout">退出登录</div>
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { logout } from '../../api'
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
    'user',
    'requestLoading'
  ]),
  methods: {
    collapsedSide () {
      this.$store.commit('setCollapsed')
    },
    update () {
      if (this.$parent.$refs.page && this.$parent.$refs.page.updatePage) {
        this.$parent.$refs.page.updatePage()
      } else {
        this.$store.commit('setLoading', true)
        setTimeout(() => {
          this.$store.commit('setLoading', false)
        }, 1500)
      }
    },
    toLogout () {
      logout().then(() => {
        this.$store.commit('setUser', {})
        this.$router.push('/login')
      })
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
  .username {
    margin-left: 10px;
  }
  @keyframes spinLoading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .spin-loading {
    animation: spinLoading .5s linear infinite;
  }
  .down-menu-item {
    line-height: 34px;
  }
</style>
