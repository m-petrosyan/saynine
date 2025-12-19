<script setup>
import ElephantYellow from "@/assets/videos/elephant_yellow_tshirt.mp4";
import ElephantYellowHover from "@/assets/videos/elephant_yellow_tshirt_hover.mp4";
import {useChartStore} from '@/stores/chart'
import {computed} from 'vue'

const store = useChartStore()
const trafficData = computed(() => store.trafficInfo)
</script>

<template>
  <div class="relative">
    <div v-for="(item,index) in trafficData" :key="item.title"
         class=" pb-4 mb-4"
         :class="{'border-b-2 border-white-blue':index !== trafficData.length - 1 }">
      <div class="flex items-center gap-4">
        <img :src="item.icon" :alt="item.title"/>
        <h4 class="text-lg font-bold">{{ item.title }}</h4>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <p class="text-2xl font-bold pt-6">{{ item.value }}</p>
          <p class="text-md text-gray">{{ item.value_title }}</p>
        </div>
        <div v-if="item.avg" class="flex flex-col">
          <p class="text-2xl font-bold pt-6">{{ item.avg }}</p>
          <p class="text-md text-gray">Avg. provided</p>
        </div>
        <ElementsRankInfo
            v-if="item.percent"
            value="50%"
            :growth="item.growth"
            noarrow
            class="text-[17px] md:text-xl"/>
      </div>
    </div>
    <ElementsVideoHover :start="ElephantYellow" :hover="ElephantYellowHover"
                        class="hidden lg:block mt-20 lg:absolute -left-34 brightness-110"/>
  </div>
</template>