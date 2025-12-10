<script setup>
import ChartDoughnut from "@/components/icons/ChartDoughnut.vue";
import ChartLine from "@/components/icons/ChartLine.vue";

const chartData = ref([
  {title: 'DR', from: 70, to: 82, percent: '15%', icon: ChartDoughnut},
  {title: 'Traffic', from: '51.4K', to: '54.4K', percent: '5%', icon: ChartLine},
])
</script>

<template>
  <div class="flex gap-4">
    <div v-for="chart in chartData" :key="chart.title"
         class="flex h-fit items-center border-2 rounded-xl p-2 border-blue-light gap-4 text-lg">
      <div class="flex gap-2 items-center font-bold">
        <component :is="chart.icon"/>
        <p class="font-medium">{{ chart.title }}</p>
        <p class="text-xl">{{ chart.from }}</p>
        <IconsArrow/>
        <p class="text-xl">{{ chart.to }}</p>
      </div>
      <ElementsRankInfo :percent="chart.percent">
        <IconsArrowBolder/>
      </ElementsRankInfo>
    </div>
  </div>
</template>