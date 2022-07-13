<template > 
  <section class="chat" v-if="toggleModal" @keypress.esc="onCloseModal">
    <input
      v-model="filterBy.userInput"
      type="text"
      class="form-input"
      placeholder="start chat..."
    />
  </section>
</template>

<script>
export default {
  name: 'chat-app',
  data() {
    return {
      filterBy: {
        userInput: '',
      },
      isOpen:false
    }
  },
  methods: {
    onCloseModal(e){
      console.log(e);
    }
  },
  computed:{
    toggleModal(){
        return this.$store.getters.modalStatus
    }
  }
}
</script>
