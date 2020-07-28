<template>
  <div class="content-page">
    <div class="button-group">
      <Button type="primary" icon="md-add" @click="toAddAccount">添加账号</Button>
    </div>
    <Modal
      v-model="addModal"
      title="添加账号"
      @on-ok="submitAdd"
      :mask-closable="false"
      :loading="true">
      <Form
        ref="addForm"
        :model="user"
        :rules="userRules"
        :label-width="90">
        <FormItem label="密码" prop="password">
          <Input v-model="user.password" type="password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="确认密码" prop="password2">
          <Input v-model="user.password2" type="password" placeholder="请输入确认密码"/>
        </FormItem>
        <FormItem label="有效天数" prop="expire">
          <Input v-model="user.expire" placeholder="请输入有效天数"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { addAccount } from '../../api'
export default {
  name: "index",
  data () {
    return {
      addModal: false,
      user: {
        password: '',
        password2: '',
        expire: null
      },
      userRules: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ],
        expire: [
          { required: true, message: '有效期不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    toAddAccount () {
      this.$refs.addForm.resetFields()
      this.addModal = true
    },
    submitAdd () {
      if (this.user.password !== this.user.password2) {
        this.$Message.error('密码不一致！')
        return
      }
      this.$refs.addForm.validate(valid => {
        if (valid) {
          const params = {
            password: this.user.password,
            expire_time: this.user.expire,
            type: 1
          }
          addAccount(params).then(() => {
            this.addModal = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
