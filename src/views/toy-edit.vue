<template>
  <section v-if="toyToEdit" class="car-edit py-2">
    <form @submit.prevent="saveToy" class="form">
      <div class="form-control">
        <label for="txt" class="form-label">toy name</label>
        <input required v-model="toyToEdit.name" id="txt" type="text" class="form-input"
          placeholder="Enter your toy name here..." />
      </div>
      <div class="form-control">
        <label for="price" class="form-label">toy price</label>
        <input required v-model.number="toyToEdit.price" id="price" type="number" class="form-input" />
      </div>
      <div v-for="label in this.toyToEdit.labels">   
      <h1>{{label}}</h1> 
      <div class="flex">
        <label for="labels">Choose a label:</label>

        <select name="labels" id="labels" multiple required>
          <option value="On wheels">On wheels</option>
          <option value="Box game">Box game</option>
          <option value="Art">Art</option>
          <option value="Baby">Baby</option>
          <option value="Doll">Doll</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Outdoor">Outdoor</option>
        </select>
      </div>
      </div>
      <div class="btn-group">
        <button @click="saveToy" class="btn btn-info">save</button>
        <button @click="goBack" class="btn btn-danger-text">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
import { toyService } from '../js/toy-service.js'

export default {
  name: 'toy-edit',
  data() {
    return {
      toyToEdit: null,
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      toyService.getById(id).then((toy) => {
        this.toyToEdit = toy
      })
    } else this.toyToEdit = toyService.getEmptyToy()
  },
  methods: {
    goBack() {
      this.$router.push('/toy')
    },
    saveToy() {
      this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit }).then(() => {
        this.$router.push('/toy')
      })
    },
  },
}
</script>
