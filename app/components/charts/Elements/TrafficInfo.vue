<script setup>
import Backlink from "~/assets/icons/backlink.svg";
import Average from "~/assets/icons/average.svg";
import Domain from "~/assets/icons/domain.svg";
import ElephantYellow from "~/assets/videos/elephant_yellow_tshirt.mp4";
import ElephantYellowHover from "~/assets/videos/elephant_yellow_tshirt_hover.mp4";

const trafficData = [
  {title: 'Backlinks provided', value: '15/30', percent: '50%', growth: true, icon: Backlink},
  {title: 'Average traffic', value: '10', avg: 97058, growth: true, icon: Average},
  {title: 'Domain rate', value: '50 DR', avg: '70 DR', growth: true, icon: Domain},
];
</script>

<template>
  <div class="w-4/12 relative">
    <div v-for="(item,index) in trafficData" :key="item.title"
         class=" pb-4 mb-4"
         :class="{'border-b-2 border-white-blue':index !== trafficData.length - 1 }">
      <div class="flex items-center gap-4">
        <img :src="item.icon" :alt="item.title"/>
        <h4 class="text-md font-bold">{{ item.title }}</h4>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <p class="text-xl font-bold pt-6">{{ item.value }}</p>
          <p class="text-info text-gray">Min. agreed</p>
        </div>
        <div v-if="item.avg" class="flex flex-col">
          <p class="text-xl font-bold pt-6">{{ item.avg }}</p>
          <p class="text-info text-gray">Avg. provided</p>
        </div>
        <ElementsRankInfo
            v-if="item.percent"
            value="50%"
            :growth="item.growth"
            noarrow/>
      </div>
    </div>
    <ElementsVideoHover :start="ElephantYellow" :hover="ElephantYellowHover"
                        class="mt-20 absolute -left-34 brightness-110"/>
  </div>
</template>