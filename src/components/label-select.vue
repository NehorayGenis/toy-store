<template>
    <el-select v-model="trial" @change="logValues" class="m-2" placeholder="Select" size="large" multiple>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

</template>

<script >

export default {
    name: 'label-select',
    data() {
        return {
            trial:[],
            options: [
                {
                    value: 'On wheels',
                    label: 'On wheels',
                },
                {
                    value: 'Box game',
                    label: 'Box game',
                },
                {
                    value: 'Art',
                    label: 'Art',
                },
                {
                    value: 'Baby',
                    label: 'Baby',
                },
                {
                    value: 'Doll',
                    label: 'Doll',
                },
                {
                    value: 'Puzzle',
                    label: 'Puzzle',
                },
                {
                    value: 'Outdoor',
                    label: 'Outdoor',
                },
            ]
        }
    },
    methods: {
        logValues() {
            console.log(this.trial); 
        },
    },

}
</script>
