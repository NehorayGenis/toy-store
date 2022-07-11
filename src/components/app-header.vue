<template>
  <header class="main-header flex items-center justify-between">
    <nav class="flex gap-1">
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/toy">toys</router-link>
      <router-link class="link" to="/about">About</router-link>
    </nav>
    <button class="chat-button" @click="toggleModal()"> modal</button>
  </header>
</template>

<script>
export default {
  name: 'chat-button',
  methods: {
    toggleModal() {
      this.$store.commit({ type: 'toggleModal'})
    },
  },
}
</script>