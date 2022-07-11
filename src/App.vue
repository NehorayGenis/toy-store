<template>
  <section class="app-container container">
    <app-header />
    <chat-app/>
    <router-view />
    <!-- <app-footer /> -->
  </section>
</template>

<script >
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
import chatApp from './components/chat-app.vue'
export default {
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  name: 'app',
  components: {
    appHeader,
    appFooter,
    chatApp
  },
}
</script>