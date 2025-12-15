<script setup>
import ElephantOnRest from "@/assets/videos/elephant_on_rest.mp4";
import ElephantOnRestHover from "@/assets/videos/elephant_on_rest_hover.mp4";

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const data = ref([
  {
    name: '/logo-maker',
    value: 1,
    color: '#0E44B0'
  },
  {
    name: '/ai-logo-generator',
    value: 2,
    color: '#077DFD'
  },
  {
    name: '/pros-and-cons-of-creating-your-logo-yourself/',
    value: 3,
    color: '#33BEEC'
  },
  {
    name: '/business-name-generator',
    value: 4,
    color: '#99CAFF'
  },
])
</script>

<template>
  <div>
    <div class="relative">
      <ElementsVideoHover :start="ElephantOnRest" :hover="ElephantOnRestHover"
                          class="absolute bottom-0 left-22"/>
      <h2 class="text-center text-subtitle font-bold mb-10">Number of backlinks per URL</h2>
    </div>
    <div
        class="w-[1230px] h-[500px] mx-auto flex px-30 justify-center items-center relative border-3 border-white-blue outline-7 outline-white-100 rounded-xl ">
      <div class="flex gap-x-20 w-full h-full items-center justify-center">
        <ChartsDoughnutLabel :data="data" class="w-9/12" url/>
        <ChartsDoughnut :data="data" class="w-3/12" :url/>
      </div>
      <ElementsVideoHover :start="ElephantPeeking" :hover="ElephantPeekingHover"
                          class="absolute top-10 right-0"/>
    </div>
  </div>
</template>