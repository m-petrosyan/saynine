<script setup>
import ChartDoughnut from "@/components/icons/ChartDoughnut.vue";
import ChartLine from "@/components/icons/ChartLine.vue";

useHead({
  title: "Saynine"
})

const chartData = ref([
  {title: 'DR', from: 70, to: 82, prcent: 15, icon: ChartDoughnut},
  {title: 'Traffic', from: '51.4K', to: '54.4K', prcent: 5, icon: ChartLine},
])
</script>

<template>
  <div>
    <div class="flex  items-center justify-between">
      <IconsAirfocus/>
      <ChartsInfo :chartData/>
    </div>
  </div>
</template>