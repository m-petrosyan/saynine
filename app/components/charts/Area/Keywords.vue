<script setup>
import { useChartStore } from '@/stores/chart'
import { computed } from 'vue'

const store = useChartStore()
const chartData = computed(() => store.keywordsData)
const activeDatasets = computed(() => store.keywordsActiveDatasets)

const onToggleDataset = (index) => {
  store.toggleKeywordsDataset(index)
}
</script>

<template>
  <div>
    <h2 class="text-center text-3xl md:text-4xl lg:text-6xl font-bold mb-10 mt:mb-16">Ranking results by Ahrefs</h2>
    <div class="flex flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-12">
      <div class="w-full lg:w-4/12">
        <div class="leading-10 mb-6">
          <h4 class="text-md-lg md:text-2xl font-bold">Keywords</h4>
          <p class="text-xs md:text-md text-gray-dark font-normal">Select the keyword to see the info</p>
        </div>
        <ChartsAreaButtons 
          class="flex-col text-lg" 
          :chart-data="chartData" 
          :active-datasets="activeDatasets" 
          @toggle="onToggleDataset"
        />
      </div>
      <ChartsArea 
        class="lg:w-8/12"
        :chart-data="chartData" 
        :active-datasets="activeDatasets"
        :options="store.areaOptions" 
      />
    </div>
  </div>
</template>