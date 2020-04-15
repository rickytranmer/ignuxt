<template>
  <ErrorMessage class="layout-error" :error="error" />
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage'

export default {
  props: [ 'error' ],
  // layout: 'default',
  components: { ErrorMessage, },
}
</script>
