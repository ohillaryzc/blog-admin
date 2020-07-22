<template>
  <div class="about-page">
    <div class="top-tip">
      <p class="tip-title">页面元素配置</p>
      <p class="tip-content">页面元素全局配置，比如网站标题，个人信息，等等。</p>
    </div>
    <div class="form-box">
      <Form
        :model="about"
        :rules="aboutRule"
        label-position="right"
        :label-width="100"
        style="width: 600px;margin: 0 auto;">
        <FormItem label="网站标题" prop="logo">
          <Input v-model="about.logo" placeholder="请输入标题"/>
        </FormItem>
        <FormItem label="副标题" prop="subtitle">
          <Input v-model="about.subtitle" placeholder="请输入副标题"/>
        </FormItem>
        <FormItem label="博主姓名" prop="name">
          <Input v-model="about.name" placeholder="请输入博主姓名"/>
        </FormItem>
        <FormItem label="个性签名" prop="motto">
          <Input v-model="about.motto" placeholder="请输入个性签名"/>
        </FormItem>
        <FormItem label="技术定位" prop="position">
          <Input v-model="about.position" placeholder="请输入技术定位"/>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="about.address" placeholder="请输入地址"/>
        </FormItem>
        <FormItem label="简介" prop="introduction">
          <Input v-model="about.introduction" placeholder="请输入简介"/>
        </FormItem>
        <FormItem label="">
          <Button type="primary">保存</Button>
          <span class="to-edit">编辑关于页面&gt;&gt;</span>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { getAbout } from '../../api'
export default {
  name: "about",
  data () {
    return {
      about: {
        logo: '',
        subtitle: '',
        name: '',
        motto: '',
        position: '',
        page: '',
        address: '',
        introduction: ''
      },
      aboutRule: {
        logo: [
          { required: true, message: '网站标题不能为空', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '副标题不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        motto: [
          { required: true, message: '签名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    getAbout().then(data => {
      console.log(data)
    })
  }
}
</script>

<style scoped>
  .about-page {
    margin-top: 16px;
  }
  .top-tip {
    padding: 24px;
    background-color: #fff;
  }
  .tip-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .form-box {
    margin: 16px 24px;
    padding: 16px;
    background-color: #fff;
  }
  .to-edit {
    margin-left: 10px;
    font-size: 12px;
    color: #2d8cf0;
    cursor: pointer;
  }
</style>
