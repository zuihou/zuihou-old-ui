<template>
  <div class="home">
    home
  </div>
</template>

<script>
import commonApi from '@/api/CommonApi.js'

export default {
  name: 'home',
  mounted () {
    commonApi.test()
  }
}
</script>
