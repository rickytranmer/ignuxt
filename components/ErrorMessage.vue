<template>
  <div class="error-page component-ErrorMessage">
    <div class="error">
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
        <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
      </svg>

      <div class="title" v-html="message"></div>

      <p v-if="statusCode === 404" class="desc">
        <NuxtLink class="error-link" to="/" v-html="backToHome"></NuxtLink>
      </p>
      <p class="desc" v-else v-html="clientError"></p>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  props: [ 'error', ],
  head() {
    return {
      title: '' + this.statusCode + ' - ' + this.message,
      // title: (process.env.title ? process.env.title : '')
      // title: (this.title ? this.title + ' | ' : '') + this.statusCode + ' - ' + this.message
    }
  },
  layout: 'default',
  computed: {
    // ...mapState({
    //   title: (state)=> state.title
    // }),
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error && this.error.message || (process.env.nuxtMessages ? process.env.nuxtMessages.client_error : `Error`)
    },
    backToHome() {
      return process.env.nuxtMessages ? process.env.nuxtMessages.back_to_home : 'Back to the home page'
    },
    clientError() {
      return process.env.nuxtMessages ? process.env.nuxtMessages.client_error_details : 'An error occurred while rendering the page. Check developer tools console for details.'
    }
  }
}
</script>

<style lang="scss">
.error-page {
  padding: rem-calc(16);
  background: #F7F8FB;
  color: #47494E;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 100 !important;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .error {
    max-width: rem-calc(450);
  }
  .title {
    font-size: rem-calc(24);
    margin: rem-calc(12) 0;
    color: #47494E;
  }
  .desc {
    color: #7F828B;
    line-height: rem-calc(21);
    margin-bottom: rem-calc(10);
  }
  a {
    color: #7F828B !important;
    text-decoration: none;
  }
}
</style>
