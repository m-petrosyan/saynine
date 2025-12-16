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
    <div
        class="relative flex items-center md:justify-center justify-between lg:justify-center mb-10 md:mb-20">
      <ElementsVideoHover :start="ElephantOnRest" :hover="ElephantOnRestHover"
                          class="hidden md:block "/>
      <h2 class="text-center text-4xl lg:text-6xl font-bold">Number of backlinks per URL</h2>
    </div>
    <div
        class="max-w-[1230px] w-full relative mx-auto flex lg:py-14 pb-5 px-3 md:p-6 lg:px-30 justify-center items-center border-1 md:border-3 border-white-blue outline-3 md:outline-7 outline-white-100 rounded-xl">
      <div class="flex flex-col-reverse lg:flex-row gap-x-20 w-full h-full lg:items-center justify-center">
        <ChartsDoughnutLabel :data="data" class="w-full lg:w-6/12 " url/>
        <ChartsDoughnut :data="data" class="w-full md:w-6/12 font-inter px-7" url/>
      </div>
    </div>
  </div>
</template>