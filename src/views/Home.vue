<template>
  <div class="home">
    home
  </div>
</template>

<script>
import commonApi from '@/api/CommonApi.js'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  mounted () {
    commonApi.test()
  }
}
</script>
