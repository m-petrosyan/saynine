<script setup>
defineProps({
  chartData: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="flex gap-4">
    <div v-for="chart in chartData" :key="chart.title"
         class="flex h-fit items-center border-2 rounded-xl p-2 border-blue-light gap-4 text-lg">
      <div class="flex gap-2 items-center font-bold">
        <component :is="chart.icon"/>
        <p class="font-medium">{{ chart.title }}</p>
        <p>{{ chart.from }}</p>
        <IconsArrow/>
        <p>{{ chart.to }}</p>
      </div>
      <div class="bg-green text-green-dark rounded-lg flex items-center gap-1 px-2 py-1">
        <IconsArrowBolder/>
        <p class="font-medium">{{ chart.prcent }}%</p>
      </div>
    </div>
  </div>
</template>