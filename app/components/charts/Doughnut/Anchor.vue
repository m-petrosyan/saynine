<script setup>
import ElephantPeeking from "~/assets/videos/elephant-peeking.mp4";
import ElephantPeekingHover from "~/assets/videos/elephant-peeking_hover.mp4";

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const data = ref([
  {
    name: 'product management software',
    value: 5,
    color: '#3b82f6'
  },
  {
    name: 'product strategy',
    value: 4,
    color: '#1e40af'
  },
  {
    name: 'product management',
    value: 3,
    color: '#06b6d4'
  },
  {
    name: 'enterprise software',
    value: 2,
    color: '#e0f2fe'
  },
  {
    name: 'enterprise tool',
    value: 2,
    color: '#fbbf24'
  }
])
</script>

<template>
  <div>
    <h2 class="text-center text-subtitle font-bold">Number of backlinks per anchor text</h2>
    <div
        class="w-[1230px] h-[500px] mx-auto flex px-30 justify-center items-center relative border-3 border-white-blue outline-7 outline-white-100">
      <div class="flex gap-x-20 w-full h-full items-center justify-center">
        <ChartsDoughnut :data="data" class="w-4/12"/>
        <ChartsDoughnutLabel :data="data" class="w-6/12"/>
      </div>
      <ElementsVideoHover :start="ElephantPeeking" :hover="ElephantPeekingHover"
                          class="absolute top-10 right-0 translate-x-[56%]"/>
    </div>
  </div>
</template>