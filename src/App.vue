<template>
  <section class="app-container container">
    <app-header />
    <router-view />
  </section>
</template>

<script >
import appHeader from './components/app-header.vue'
export default {
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  name: 'app',
  components: {
    appHeader,
  },
}
</script>