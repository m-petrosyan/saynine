<script setup>
import ChartDoughnut from "~/assets/icons/chart_doughnut.svg";
import ChartLine from "~/assets/icons/chart_line.svg";

const chartData = [
  {title: 'DR', from: 70, to: 82, percent: '15%', growth: true, icon: ChartDoughnut},
  {title: 'Traffic', from: '51.4K', to: '54.4K', growth: true, percent: '5%', icon: ChartLine},
]
</script>

<template>
  <div class="flex flex-wrap flex-col md:flex-row gap-4 md:justify-between md:justofy-start">
    <div v-for="chart in chartData" :key="chart.title"
         class="flex h-fit items-start md:items-center justify-between border-2 rounded-xl py-2 px-3  border-white-blue gap-4 text-xl">
      <div class="flex flex-wrap flex-col md:flex-row gap-2 lg:items-center font-bold">
        <div class="flex items-center gap-2">
          <img :src="chart.icon" :alt="chart.title"/>
          <p class="font-medium">{{ chart.title }}</p>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-2xl">{{ chart.from }}</p>
          <img src="@/assets/icons/arrow_blue.svg" alt="arrow">
          <p class="text-2xl">{{ chart.to }}</p>
        </div>
      </div>
      <ElementsRankInfo :value="chart.percent" :growth="chart.growth"/>
    </div>
  </div>
</template>