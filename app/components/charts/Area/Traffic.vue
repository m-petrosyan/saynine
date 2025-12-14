<script setup>
import {provide, ref} from "vue";

const chartData = {
  labels: [
    '29 Jun 2023',
    '11 Oct 2023',
    '23 Jan 2024',
    '6 May 2024',
    '18 Aug 2024',
    '30 Nov 2024',
    '14 Nov 2025',
    '26 Dec 2025'
  ],
  datasets: [
    {
      name: 'Domain Rating',
      data: [39, 40, 42, 45, 48, 46, 49, 52],
      color: '#3b82f6',
      bgAlpha: 'rgba(59, 130, 246, 0.15)',
      yAxisID: 'y'
    },
    {
      name: 'Organic traffic',
      data: [2115, 2200, 2400, 2800, 3200, 3400, 3600, 3850],
      color: '#33BEEC',
      bgAlpha: 'rgba(34, 211, 238, 0.15)',
      yAxisID: 'y1'
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
  <!--  <div>-->
  <!--    <div class="flex justify-between gap-x-20">-->
  <!--      <ChartsTrafficInfo/>-->
  <!--      <Charts :chart-data="chartData"/>-->
  <!--    </div>-->
  <!--  </div>-->

  <div>
    <div class="flex justify-between gap-x-16">
      <ChartsElementsTrafficInfo/>
      <div class="w-full">
        <ChartsAreaButtons/>
        <ChartsArea/>
      </div>
    </div>
  </div>
</template>