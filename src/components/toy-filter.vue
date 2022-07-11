<template>
  <section class="todo-filter">
      <input @input="filter" type="search"
       v-model="filterBy.name" placeholder="Search by name">
      <select v-model="filterBy.inStock" @input="filter">
          <option v-for="(opt,i) in valueOptions" :key="i" :value="valueOptions[i]">
            {{userOptions[i]}}</option>
      </select>
      <section>
        <button class="btn" @click="sort">Sort by text</button>
      </section>
    </section>
</template>

<script>
import { utilService } from '../js/util-service'

export default {
  name: 'toy-filter',
  created() {
    // TODO: debounce
    this.filter = utilService.debounce(this.filter)
  },
  data() {
    return {
      filterBy: {
        name: '',
        isDone: null,
        toSort: false,
      },
      userOptions: ['All', 'Done', 'Active'],
      valueOptions: [null, true, false],
    }
  },
  methods: {
    filter() {
      console.log(this.filterBy);
      this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)))
    },

    sort() {
      this.filterBy.toSort = !this.filterBy.toSort
      this.$emit('setFilter', { ...this.filterBy })
    },
  },
}
</script>
