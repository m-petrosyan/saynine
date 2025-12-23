<script setup>
import {useChartStore} from '@/stores/chart'
import {computed} from 'vue'

const store = useChartStore()
const chartData = computed(() => store.trafficData)
const activeDatasets = computed(() => store.trafficActiveDatasets)

const onToggleDataset = (index) => {
  store.toggleTrafficDataset(index)
}
</script>

<template>
  <div>
    <div class="flex flex-col lg:flex-row justify-between gap-0 lg:gap-x-12">
      <ChartsElementsTrafficInfo class="w-full lg:w-4/12"/>
      <div class="lg:w-8/12 w-full mt-6 md:mt-10 lg:mt-0">
        <ChartsAreaButtons
            class="flex-col lg:flex-row"
            :chart-data="chartData"
            :active-datasets="activeDatasets"
            @toggle="onToggleDataset"
        />
        <ChartsArea
            :scale="[0, 100]"
            :chart-data="chartData"
            :active-datasets="activeDatasets"
            :options="store.areaOptions"
        />
      </div>
    </div>
  </div>
</template>