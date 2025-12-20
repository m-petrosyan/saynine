<script setup>
import ElephantOnRest from "@/assets/videos/elephant_on_rest.mp4";
import ElephantOnRestHover from "@/assets/videos/elephant_on_rest_hover.mp4";
import {useChartStore} from '@/stores/chart'
import {computed, ref} from 'vue'

const store = useChartStore()
const hoveredIndex = ref(-1)

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const data = computed(() => store.backlinksData)
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
        class="max-w-[1230px] w-full flex-col-reverse lg:flex-row gap-x-20 relative mx-auto flex lg:py-14 pb-5 px-3 md:p-6 lg:px-16 justify-center items-center border-1 md:border-3 border-white-blue outline-3 md:outline-7 outline-white-100 rounded-xl">
      <ChartsDoughnutLabel
          :data="data"
          :hovered-index="hoveredIndex"
          @hover="hoveredIndex = $event"
          class="w-full lg:w-6/12 "
          url
      />
      <ChartsDoughnut
          :data="data"
          :hovered-index="hoveredIndex"
          @hover="hoveredIndex = $event"
          class="w-full md:w-6/12 font-inter px-7"
          url
      />
    </div>
  </div>
</template>