<script setup>
defineProps({
  citations: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div v-for="item in citations" :key="item.id"
       class="w-[530px] p-8 border-4 border-white-blue rounded-3xl">
    <h3 class="text-4xl font-bold">{{ item.title }}</h3>
    <div class="flex justify-between items-center gap-x-2 border-b-2 border-blue-light py-2 mt-4">
      <div class="flex gap-3 items-center">
        <img :src="item.icon" alt="google">
        <p class="text-5xl md:text-6xl font-bold">{{ item.total }}</p>
      </div>
      <ElementsRankInfo v-if="item.rank" :value="item.rank" :growth="item.growth"/>
    </div>
    <div class="flex justify-between items-center mt-3">
      <div class="flex items-center gap-x-2">
        <p class="text-lg font-normal">Pages</p>
        <p class="text-3xl font-bold ">{{ item.pages }}</p>
      </div>
      <ElementsRankInfo v-if="item.pages_rank" :value="item.pages_rank" :growth="item.growth"/>
    </div>
  </div>
</template>