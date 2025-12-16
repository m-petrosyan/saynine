<script setup>
import ElephantPeeking from "@/assets/videos/elephant-peeking.mp4";
import ElephantPeekingHover from "@/assets/videos/elephant-peeking_hover.mp4";

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
    color: '#0E44B0'
  },
  {
    name: 'product strategy',
    value: 4,
    color: '#077DFD'
  },
  {
    name: 'product management',
    value: 3,
    color: '#33BEEC'
  },
  {
    name: 'enterprise software',
    value: 2,
    color: '#99CAFF'
  },
  {
    name: 'enterprise tool',
    value: 2,
    color: '#FCD834'
  }
])
</script>

<template>
  <div>
    <h2 class="font-inter lg:text-center text-3xl lg:text-subtitle font-bold mb-8 md:mb-0 ">Number of backlinks per
      anchor
      text</h2>
    <div
        class="max-w-[1230px] w-full relative mx-auto flex lg:py-14 p-6 lg:px-30 justify-center items-center border-1 md:border-3 border-white-blue outline-3 md:outline-7 outline-white-100 rounded-xl">
      <div class="flex flex-col lg:flex-row gap-x-20 w-full h-full lg:items-center justify-center">
        <ChartsDoughnut :data="data" class="w-6/12"/>
        <ChartsDoughnutLabel :data="data" class="w-full lg:w-6/12"/>
      </div>
      <ElementsVideoHover :start="ElephantPeeking" :hover="ElephantPeekingHover"
                          class="hidden sm:block absolute top-[-148px] lg:top-10 right-[-55px] lg:right-60 scale-50 lg:scale-100 lg:right-[-150px] rotate-270 lg:rotate-0"/>
    </div>
  </div>
</template>