<template>
  <div class="login">
    <login-form />
  </div>
</template>
<script>
import loginForm from './LoginForm.vue'
export default {
  components: {
    loginForm
  },
  created () {
    this.$store.commit('REMOVE_LOCALSTORAGE')
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('~@/assets/imgs/common/login_bg.jpg') center top no-repeat;
  background-size: cover;
}
</style>
