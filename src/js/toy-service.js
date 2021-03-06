import axios from "axios";
import { storageService } from "./async-storage.service.js";
import { utilService } from "./util-service.js";

const KEY = "toys_db";
const TOY_API = process.env.NODE_ENV !== "development" ? "/api/toy" : "//localhost:3030/api/toy";

_createToys();
export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getAvgPricePerLabel,
};

function query() {
  return axios.get(TOY_API).then((res) => {
    return res.data;
  });
  // return storageService.query(KEY)
}
function getAvgPricePerLabel(label) {
  let labelCount = {
    label,
    sumPrice: 0,
    AmountOfToys: 0,
  };
  return query().then((toys) => {
    toys.forEach((toy) => {
      if (toy.labels.includes(label)) {
        labelCount.sumPrice += toy.price;
        labelCount.AmountOfToys++;
      }
    });
    return labelCount;
  });
}
// function getAvgPricePerLabel(labels){
//   var labelMaps=[]
//   labels.forEach(label=>{
//     let labelCount={
//       label,
//       sumPrice:0,
//       AmountOfToys:0,
//     }
//     return query().then(toys=>{
//       labelMaps=toys.map(toy => {
//         if (toy.labels.includes(label)) {
//           labelCount.sumPrice += toy.price
//           labelCount.AmountOfToys++
//         }
//         return (labelCount)
//       })
//       console.log(labelMaps);
//       return labelMaps
//     })
//   })
// }

function getById(id) {
  return axios.get(TOY_API + id).then((res) => {
    return res.data;
  });
  return storageService.get(KEY, id);
}

function remove(id) {
  console.log(id);
  return axios.delete(`http://localhost:3030/api/toy/:${id}`).then((res) => {
    return res.data;
  });
  return storageService.remove(KEY, id);
}

function save(toy) {
  if (toy._id) return axios.put(TOY_API + toy._id, toy);
  return axios.post(TOY_API, toy);
}

function getEmptyToy() {
  return {
    _id: "",
    title: "",
    isDone: false,
  };
}

function _createToys() {
  let toys = utilService.loadFromStorage(KEY);

  if (!toys || !toys.length) {
    toys = [
      _createToy("puki"),
      _createToy("buzz"),
      _createToy("s"),
      _createToy("d"),
      _createToy("c"),
      _createToy("w"),
      _createToy("t"),
      _createToy("woody"),
    ];
    localStorage.setItem(KEY, JSON.stringify(toys));
  }
  return toys;
}

function _createToy(name) {
  return {
    _id: utilService.makeId(),
    name,
    price: utilService.getRandomInt(10, 200),
    labels: ["Doll", "Battery Powered", "Baby"],
    addedToStock: 1631031801011,
    inStock: true,
    reviews: ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet."],
  };
}
