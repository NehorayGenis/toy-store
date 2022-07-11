<template>
  <section class="car-app container flex flex-col gap-1">
    <button @click="goToEdit" class="btn btn-secondary">Add a new toy</button>
    <toy-filter @setFilter="setFilter" />
    <toy-list @removeToy="removeToy" v-if="toys" :toys="toysToShow" />
    <color-picker/>
  </section>
</template>

<script>
import { toyService } from '../js/toy-service.js'
import toyFilter from '../components/toy-filter.vue'
import toyList from '../components/toy-list.vue'
import colorPicker from '../components/color-picker.vue'


export default {
  name: 'toy-app',
  data() {
    return {
      filterBy: null,
    }
  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },
    toysToShow() {
      if (!this.filterBy) return this.toys
      const regex = new RegExp(this.filterBy.name, 'i')
      return this.toys.filter((toy) => regex.test(toy.name))
    },
  },
  created() { },
  methods: {
    loadToys() {
      toyService.query().then((toys) => (this.toys = toys))
    },
    setFilter(filterBy) {
      this.filterBy=filterBy
      console.log(filterBy);
      this.$store.commit({ type: 'setFilter', filterBy })
    },
    goToEdit() {
      this.$router.push(`/toy/edit`)
    },
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', id: toyId })
    },
  },
  components: {
    toyList,
    toyFilter,
    colorPicker,
  },
}
</script>
