<template>
  <div></div>
</template>

<script>
export default {
  created () {
    const { path, query } = this.$route
    const redirectPath = path.replace('/redirect', '')
    this.$router.replace({ path: redirectPath, query })
  }
}
</script>
