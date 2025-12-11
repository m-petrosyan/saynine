<script setup>
import ChartDoughnut from "@/assets/icons/chart_doughnut.svg";
import ChartLine from "@/assets/icons/chart_line.svg";

const chartData = [
  {title: 'DR', from: 70, to: 82, percent: '15%', growth: true, icon: ChartDoughnut},
  {title: 'Traffic', from: '51.4K', to: '54.4K', growth: true, percent: '5%', icon: ChartLine},
]
</script>

<template>
  <div class="flex gap-4">
    <div v-for="chart in chartData" :key="chart.title"
         class="flex h-fit items-center border-2 rounded-xl p-2 border-white-blue gap-4 text-lg">
      <div class="flex gap-2 items-center font-bold">
        <img :src="chart.icon" :alt="chart.title"/>
        <p class="font-medium">{{ chart.title }}</p>
        <p class="text-xl">{{ chart.from }}</p>
        <img src="../../assets/icons/arrow_blue.svg" alt="arrow">
        <p class="text-xl">{{ chart.to }}</p>
      </div>
      <ElementsRankInfo :value="chart.percent" :growth="chart.growth"/>
    </div>
  </div>
</template>