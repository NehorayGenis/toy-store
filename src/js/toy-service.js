import axios from "axios"
import { storageService } from "./async-storage.service.js"
import { utilService } from "./util-service.js"

const KEY = "toys_db"
const TOY_API="127.0.0.1:3030/api/toy"
_createToys()
export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

function query() {

  return axios.get(`http://localhost:3030/api/toy`).then(res=>{
    return (res.data)
  })
  // return storageService.query(KEY)
}

function getById(id) {
  return axios.get(`http://localhost:3030/api/toy/${id}`).then(res=>{
    return (res.data)
  })
  return storageService.get(KEY, id)
}

function remove(id) {
  console.log(id)
  return axios.delete(`http://localhost:3030/api/toy/:${id}`).then(res=>{
    return (res.data)
  })
  return storageService.remove(KEY, id)
}

function save(toy) {
  if (toy._id) return storageService.put(KEY, toy)
  return storageService.post(KEY, toy)
}

function getEmptyToy() {
  return {
    _id: "",
    title: "",
    isDone: false,
  }
}

function _createToys() {
  let toys = utilService.loadFromStorage(KEY)

  if (!toys || !toys.length) {
    toys = [
      _createToy("puki"),
     _createToy("buzz"), 
     _createToy("s"), 
     _createToy("d"), 
     _createToy("c"), 
     _createToy("w"), 
     _createToy("t"), 
     _createToy("woody")
    ]
    localStorage.setItem(KEY, JSON.stringify(toys))
  }
  return toys
}

function _createToy(name) {

  return {
    _id: utilService.makeId(),
    name,
    price: utilService.getRandomInt(10,200),
    labels: ["Doll", "Battery Powered","Baby"],
    addedToStock:1631031801011,
    inStock:true,
    reviews:['Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.']
  }
}
