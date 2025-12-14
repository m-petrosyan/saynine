<script setup>
import {provide, ref} from 'vue'

const chartData = {
  labels: [
    '21 Jun 2023',
    '01 Sep 2023',
    '23 Jan 2024',
    '6 May 2024',
    '18 Aug 2024',
    '30 Nov 2024',
    '14 Nov 2025',
    '26 Dec 2025'
  ],
  datasets: [
    {
      name: 'product strategy',
      data: [10, 15, 12, 20, 18, 49, 46, 50, 45],
      color: '#3b82f6',
      bgAlpha: 'rgba(59, 130, 246, 0.15)',
      yAxisID: 'y',
      rank: 15,
      growth: true
    },
    {
      name: 'product strategy',
      data: [51, 2364, 1548, 1054, 900, 355, 3900, 2454],
      color: '#33BEEC',
      bgAlpha: 'rgba(34, 211, 238, 0.15)',
      yAxisID: 'y1',
      rank: 13,
      growth: true
    }
  ]
}

const activeDatasets = ref(new Array(chartData.datasets.length).fill(true))

const toggleDataset = (index) => {
  activeDatasets.value[index] = !activeDatasets.value[index]
}

provide('chartContext', {
  chartData,
  activeDatasets,
  toggleDataset
})
</script>

<template>
  <div>
    <h2 class="text-center text-subtitle font-bold mb-16">Ranking results by Ahrefs</h2>
    <div class="flex justify-between gap-x-10">
      <div class="w-4/12">
        <div class="leading-10 mb-6">
          <h4 class="text-xl font-bold">Keywords</h4>
          <p class="text-sm text-gray-500">Select the keyword to see the info</p>
        </div>
        <ChartsAreaButtons class="flex-col text-md"/>
      </div>
      <ChartsArea/>
    </div>
  </div>
</template>