<template>
  <div class="login-form">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item size="medium" prop="account">
        <el-input
          v-model="form.account"
          placeholder="用户名"
          prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item size="medium" prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          show-password
          prefix-icon="el-icon-key"></el-input>
      </el-form-item>
      <el-form-item size="medium" style="text-align: center;">
        <el-button type="primary" @click="goLogin" :loading="loading">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goLogin () {
      const vm = this
      vm.$refs.form.validate(valid => {
        if (valid) {
          vm.loading = true
          vm.$store.dispatch('getUserInfo', vm.form).then(res => {
            if (res.isSuccess) {
              vm.$store.dispatch('getDictionaryEnums')
              vm.$router.push('/home')
            }
          }).finally(() => {
            vm.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-form{
  width: 300px;
  padding: 60px 30px 30px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
