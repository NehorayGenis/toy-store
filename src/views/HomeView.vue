<template>
  <main>
    <awesome-chart :testData="getTestData" v-if="avgPricesOfLabels.length!==0"></awesome-chart>
    <div>
      <awesome-date/>
    </div>
    <mapVue />
  </main>
</template>


<script >
import awesomeChart from '../components/chart.vue'
import awesomeDate from '../components/date.vue'
import mapVue from '../components/map.vue'
import { toyService } from '../js/toy-service.js'
export default {
  name: 'home',
  components: {
    awesomeChart,
    awesomeDate,
    mapVue,
  },

  data() {
    return {
      labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"],
      labelsMap: [],
      avgPricesOfLabels:[],
    }
  },
  created() {
    this.labels.forEach(label => {
      toyService.getAvgPricePerLabel(label).then((labelMap) => {
        this.labelsMap.push(labelMap)
        if (labelMap.sumPrice!==0) {  
          this.avgPricesOfLabels.push(labelMap.sumPrice/labelMap.AmountOfToys)
        }
        else{
          this.avgPricesOfLabels.push(0)
        }
      })
    })
  },
  computed:{
    getTestData(){
    return  {
        labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"],
        datasets: [
          {
            data: this.avgPricesOfLabels,
            backgroundColor: ['red', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
          },
        ],
      }
  }}
}
</script>


