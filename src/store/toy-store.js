import { toyService } from '../js/toy-service.js'

export default {
    state: {
      toys: null,
      lastRemovedToy: null,
      filterBy: {
        title: '',
        isDone: null,
        toSort: false,
        pageIdx: 0,
      },
      pageSize: 2,
    },
    getters: {
      filteredToys({ filterBy, toys, pageSize }) {
        if (!toys) return
  
        const regex = new RegExp(filterBy.title, 'i')
        let filteredToys = toys.filter((toy) => regex.test(toy.title))
  
        if (filterBy.isDone !== null) {
          filteredToys = filteredToys.filter(
            (toy) => toy.isDone === filterBy.isDone
          )
        }
  
        if (filterBy.toSort) {
          filteredToys.sort((t1, t2) => t1.title.localeCompare(t2.title))
        }
        console.log(filteredToys)
  
        const startIdx = filterBy.pageIdx * pageSize
  
        filteredToys = filteredToys.slice(startIdx, startIdx + pageSize)
        console.log(filteredToys)
        return filteredToys
      },
      toys(state) {
        return state.toys
      },
    },
  
    mutations: {
      setToys(state, { toys }) {
        state.toys = toys
      },
      deleteToy(state, { toyId }) {
        const idx = state.toys.findIndex((toy) => toy._id === toyId)
        state.lastRemovedToy = state.toys[idx]
        state.toys.splice(idx, 1)
      },
      addToy(state, { toy }) {
        state.toys.unshift(toy)
      },
      updateToy(state, { toy }) {
        const idx = state.toys.findIndex((p) => p._id === toy._id)
        state.toys.splice(idx, 1, Toy)
      },
      clearRemoveToy(state) {
        state.lastRemovedToy = null
      },
      undoRemoveToy(state) {
        state.toys.unshift(state.lastRemovedToy)
        state.lastRemovedToy = null
      },
      setFilter(state, { filterBy }) {
        state.filterBy = { ...filterBy, pageIdx: state.filterBy.pageIdx }
      },
      setPage(state, { dir }) {
        state.filterBy.pageIdx += dir
        console.log(state.filterBy.pageIdx)
        if (state.filterBy.pageIdx < 0) state.filterBy.pageIdx = 0
        if (state.filterBy.pageIdx * state.pageSize > state.toys.length - 1)
          state.filterBy.pageIdx = 0
      },
      toggleIsDone(state, { toyId }) {
        const toy = state.toys.find((toy) => toy._id === toyId)
        toy.isDone = !toy.isDone
      },
      removeToy(state, { toyId }) {
        const idx = state.toys.findIndex((toy) => toy._id === toyId)
        state.toys.splice(idx, 1)
      },
    },
    actions: {
      toggleToy({ commit, state }, { toyId }) {
        console.log('store:', toyId)
        commit({ type: 'toggleIsDone', toyId })
        const toy = state.toys.find((toy) => toy._id === toyId)
        toyService.save(toy)
      },
  
      removeToy({ commit, state }, { toyId }) {
        console.log('store:', toyId)
        commit({ type: 'removeToy', toyId })
  
        toyService.remove(toyId).then().catch()
      },
      loadToys({ commit }) {
        toyService.query().then((toys) => {
          commit({ type: 'setToys', toys })
        })
      },
      // deleteToy({ commit }, payload) {
      //   commit(payload)
      //   return ToyService
      //     .remove(payload.ToyId)
      //     .then(() => {
      //       commit({ type: 'clearRemoveTodo' })
      //     })
      //     .catch((err) => {
      //       commit({ type: 'undoRemoveTodo' })
      //       throw err
      //     })
      // },
      saveToy({ commit }, { toy }) {
        const actionType = toy._id ? 'updateToy' : 'addToy'
        return toyService.save(toy).then((savedToy) => {
          commit({ type: actionType, toy: savedToy })
          return savedToy
        })
      },
    },
  }