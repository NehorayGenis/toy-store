<template>
  <section v-if="toy" class="car-details flex flex-col items-center gap-2">
    <article>
      <p><span class="fw-bold">ID:</span> {{ toy._id }}</p>
      <p><span class="fw-bold">name:</span> {{ toy.name }}</p>
      <p><span class="fw-bold">price:</span> {{ toy.price }}</p>
      <div v-for="review in toy.reviews">
      <p><span class="fw-bold">review:</span> {{ review }}</p>
      </div>
      <div v-for="label in toy.labels">
      <p><span class="fw-bold">label:</span> {{ label }}</p>
      </div>
    </article>
    <button @click="goBack" class="btn btn-primary">go back</button>
  </section>
</template>

<script>
import { toyService } from '../js/toy-service.js'

export default {
  name: 'toy-detail',
  data() {
    return {
      toy: null,
    }
  },
  created() {
    const { id } = this.$route.params
    toyService.getById(id).then((toy) => {
      this.toy = toy
    })
  },
  methods: {
    goBack() {
      this.$router.push('/toy')
    },
  },
}
</script>
