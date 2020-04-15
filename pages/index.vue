<template>
  <main id="main" role="main">
    <h1>Home</h1>
  </main>
</template>


<script>
export default {
  head() { return {
    title: (process.env.title ? process.env.title : '')
      +'Home'
  } },
  // props: [],
  // components: {},
  data() { return {
  } },
  // computed: {},
  // watch: {},
  // methods: {},
}
</script>


<style lang="scss">
</style>
