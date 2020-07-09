<template>
  <div class="login-page">
    <div class="login-box">
      <div class="top-logo">
        <p>blog-admin后台管理系统</p>
        <p>iView-admin后台模板实践</p>
      </div>
      <div class="form-box">
        <Form :model="visitorForm" :label-width="0" v-if="isVisitor">
          <FormItem prop="password">
            <Input type="password" v-model="visitorForm.password" size="large" prefix="md-lock" placeholder="请输入游客码"/>
          </FormItem>
        </Form>
        <Form :model="loginForm" :label-width="0" v-else>
          <FormItem prop="username">
            <Input v-model="loginForm.username" prefix="ios-contact" size="large" placeholder="请输入用户名"/>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="loginForm.password" prefix="md-lock" size="large" placeholder="请输入密码"/>
          </FormItem>
        </Form>
        <div class="option-box">
          <Checkbox v-model="keep" size="large">自动登录</Checkbox>
          <div class="change" @click="isVisitor = !isVisitor">
            <Icon type="ios-repeat" color="#2d8cf0" size="24"/>
            <span>{{ isVisitor ? '管理登录' : '游客登录' }}</span>
          </div>
        </div>
        <Button type="primary" size="large" long @click="toLogin" :loading="loading">进入</Button>
      </div>
    </div>
    <div class="copy-box">
      <div class="top-link flex-wrap flex-x-around">
        <a href="http://123.56.223.218">首页</a>
        <a href="https://github.com/ohillaryzc/blog-admin">github</a>
        <a href="https://github.com/ohillaryzc/iView-Admin">iView-admin</a>
      </div>
      <div class="copy-right">Copyright © 2020 ohillaryzc</div>
    </div>
  </div>
</template>

<script>
import { visitorLogin } from '../api'
export default {
  name: "login",
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      visitorForm: {
        password: ''
      },
      keep: false,
      isVisitor: true,
      loading: false
    }
  },
  methods: {
    toLogin () {
      this.loading = true
      if (this.isVisitor) {
        this.toVisitorLogin()
      } else {
        this.toAdminLogin()
      }
    },
    toVisitorLogin () {
      visitorLogin(this.visitorForm).then(data => {
        console.log(data)
      }, err => {
        console.log(err)
        this.loading = false
      })
    },
    toAdminLogin () {}
  }
}
</script>

<style scoped>
  .login-page {
    position: relative;
    height: 100vh;
    padding-top: 150px;
    min-height: 600px;
    background-image: url("https://file.iviewui.com/admin-pro-dist/img/body.8aa7c4a6.svg");
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .login-box {
    width: 400px;
    margin: 0 auto;
  }
  .top-logo {
    text-align: center;
    margin-bottom: 24px;
  }
  .top-logo p:nth-child(1) {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.8;
  }
  .top-logo p:nth-child(2) {
    font-size: 18px;
    color: #808695;
    margin-top: 16px;
  }
  .option-box {
    margin-bottom: 24px;
  }
  .change {
    display: flex;
    align-items: center;
    color: #2d8cf0;
    font-size: 16px;
    float: right;
    cursor: pointer;
  }
  .copy-box {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 400px;
    margin-left: -200px;
    text-align: center;
  }
  .top-link {
    padding: 16px 50px;
  }
</style>
