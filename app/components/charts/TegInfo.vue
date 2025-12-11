<script setup>
const tegData = ref([
  {
    id: 1,
    name: 'product strategy',
    rank: 15,
  },
  {
    id: 2,
    name: 'product strategy',
    rank: 13,
  },
])

const activeTeg = ref(1)
</script>

<template>
  <div class="flex flex-col gap-y-6 w-3/12">
    <div class="leading-10">
      <h4 class="text-xl font-bold">Keywords</h4>
      <p class="text-info text-gray-dark">Select the keyword to see the info</p>
    </div>
    <div>
      <div v-for="item in tegData" :key="item.id"
           class="flex items-center justify-between p-4 rounded-lg mb-4"
           :class="{ 'bg-blue-50': item.id === activeTeg}">
        <p>product strategy</p>
        <ElementsRankInfo :percent="item.rank">
          <IconsArrowBolder/>
        </ElementsRankInfo>
      </div>
    </div>
  </div>
</template>