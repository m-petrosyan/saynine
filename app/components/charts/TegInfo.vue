<script setup>
const tegData = [
  {
    id: 1,
    name: 'product strategy',
    rank: 15,
    growth: true
  },
  {
    id: 2,
    name: 'product strategy',
    rank: 13,
    growth: true
  },
]

const activeTeg = ref(1)
</script>

<template>
  <div class="flex flex-col gap-y-6 w-3/12">
    <div class="leading-10">
      <h4 class="text-xl font-bold">Keywords</h4>
      <p class="text-sm text-gray-500">Select the keyword to see the info</p>
    </div>
    <div class="flex flex-col gap-y-4">
      <ElementsRadioButton
          v-for="item in tegData" :key="item.id"
          :item="item"
          :active="activeTeg"
          v-model="activeTeg"/>
    </div>
  </div>
</template>